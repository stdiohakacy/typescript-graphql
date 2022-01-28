import { Categories, CategoriesModel } from "../entities/Categories";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CategoriesInput } from "./types/category-input";

@Resolver()
export class CategoriesResolver {
    @Query((_returns) => Categories, { nullable: false })
    async returnSingleCategory(@Arg('id') id: string) {
        return await CategoriesModel.findById({ _id: id });
    }

    @Query(() => [Categories])
    async returnAllCategories() {
        return await CategoriesModel.find();
    }

    @Mutation(() => Categories)
    async createCategory(@Arg('data') { name, description }: CategoriesInput): Promise<Categories> {
        const category = await CategoriesModel.create({ name, description });
        await category.save();
        return category;
    }
}