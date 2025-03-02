import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { NotFoundException } from "@nestjs/common";
import { InjectRepository, } from "@nestjs/typeorm";
import { User } from "../../database/typeorm/entities/User";
import { Repository }  from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    findAll(role?: 'CUSTOMER' | 'ADMIN') {
        return this.userRepository.find();
    }

    findOne(id: number) {
        const user = this.userRepository.findOneBy({id})
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        return user
    }

    create(createUserDto: CreateUserDto) {
        const newUser = this.userRepository.create({
            ...createUserDto,
            createdAt: new Date()
        })
        return this.userRepository.save(newUser);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        const user = this.userRepository.findOneBy({id})
        if (!user) {
            throw new NotFoundException('User Not Found')
        }
        this.userRepository.update({id}, {
            ...updateUserDto,
            updatedAt: new Date()
        }).then(response => {
            console.log('response', response)
        });
        return this.userRepository.findOneBy({id})
    }

    delete (id: number) {
      return this.userRepository.delete({id})
    }
}
