import { Injectable } from '@nestjs/common';

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
        return user
    }

    create(user: { name: string, email: string, role: 'CUSTOMER' | 'ADMIN'}) {
        const userByHighestId = [...this.users].sort((a, b) => b.id = a.id)
        const newUser = {
            id: userByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updatedUser: { name?: string, email?: string, role?: 'CUSTOMER' | 'ADMIN'}) {
        this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updatedUser}
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
