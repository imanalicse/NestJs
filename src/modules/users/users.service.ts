import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Iman Ali",
            "email": "imanali.cse@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "Ishak Ahmed",
            "email": "ishak@gmail.com",
            "role": "CUSTOMER"
        },
    ]

    findAll(role?: 'CUSTOMER' | 'ADMIN') {
        if (role) {
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        return user
    }

    create(createUserDto: CreateUserDto) {
        const userByHighestId = [...this.users].sort((a, b) => b.id = a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updateUserDto}
            }
            return user
        })
        return this.findOne(id)
    }

    delete (id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
