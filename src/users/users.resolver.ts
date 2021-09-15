import {
  Query,
  Mutation,
  Args,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserCreateInput } from './inputs/user-create.input';
import { UserUpdateInput } from './inputs/user-update.input';
import { ShoppingListsService } from '../shopping-lists/shopping-lists.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private shoppingListsService: ShoppingListsService,
  ) {}

  @ResolveField()
  shoppingLists(@Parent() user) {
    const id = user.id;
    return this.shoppingListsService.findAllByUser(id);
  }

  @Query(() => [User], { name: 'users' })
  async getUsers() {
    try {
      return this.usersService.findAll();
    } catch (err) {
      console.log('Error on finding all users', err);
    }
  }

  @Query(() => User, { name: 'user' })
  async getUser(@Args('id') id: string) {
    try {
      return this.usersService.findOne(id);
    } catch (err) {
      console.log('Error on finding user', err);
    }
  }

  @Mutation(() => User)
  async createUser(@Args('data') data: UserCreateInput) {
    try {
      const user = await this.usersService.create(data);

      return user;
    } catch (err) {
      console.log('Error on creating user', err);
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: string,
    @Args('values') values: UserUpdateInput,
  ) {
    try {
      const user = await this.usersService.update(id, values);

      return user;
    } catch (err) {
      console.log('Error on updating user', err);
    }
  }

  @Mutation(() => String)
  async deleteUser(@Args('id') id: string) {
    try {
      await this.usersService.delete(id);

      return id;
    } catch (err) {
      console.log('Error on deleting user', err);
    }
  }

  @Mutation(() => String)
  async restoreUser(@Args('id') id: string) {
    try {
      await this.usersService.restore(id);

      return id;
    } catch (err) {
      console.log('Error on restoring user', err);
    }
  }
}
