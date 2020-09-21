import { gql } from "@apollo/client";

// export const CREATE_USER_NODE = gql`
// mutation(){
//   mutation($name: String!, $email: String!, $password: String!) {
//   CreateUser(name: $name, email: $email, password: $password) {
//     userId
//     name
//     email
//     password
//   }
// }
// }`

export const CREATE_RECIPE_WITH_INGREDIENTS_AND_CREATOR = gql`
  mutation(
    $recipeId: ID!
    $name: String!
    $description: String!
    #$published: DateTime,
    $userId: String!
    $ingredients: [CustomIngredientsInput]
  ) {
    createRecipeWithIngredients(
      recipeId: $recipeId
      name: $name
      description: $description
      # published: DateTime,
      userId: $userId
      ingredients: $ingredients
    ) {
      recipeId
    }
  }
`;

export const CREATE_RECIPE_NODE = gql`
  mutation(
    $name: String!
    $description: String!
    $published: _Neo4jDateTimeInput
    $lastEdited: _Neo4jDateTimeInput
  ) {
    CreateRecipe(
      name: $name
      description: $description
      published: $published
      lastEdited: $lastEdited
    ) {
      recipeId
      name
      description
      published {
        formatted
      }
      lastEdited {
        formatted
      }
      creator {
        userId
        name
      }
    }
  }
`;

export const ADD_RECIPE_PARENT_RELATIONSHIP = gql`
  mutation($recipe: _RecipeInput, $parentRecipe: _RecipeInput) {
    AddRecipeParent(
      from: { recipeId: $recipe }
      to: { recipeId: $parentRecipe }
    ) {
      from {
        name
        recipeId
      }
      to {
        name
        recipeId
      }
    }
  }
`;

export const ADD_RECIPE_CREATOR_RELATIONSHIP = gql`
  mutation($recipeId: ID!, $creatorId: ID!) {
    AddRecipeCreator(
      from: { recipeId: $recipeId }
      to: { userId: $creatorId }
    ) {
      from {
        recipeId
        name
      }
      to {
        userId
        name
      }
    }
  }
`;

export const ADD_RECIPE_INGREDIENT_RELATIONSHIP = gql`
  mutation(
    $flavor: _FlavorInput!
    $recipe: _RecipeInput!
    $amount: Int
    $measurement: String
  ) {
    AddRecipeIngredients(
      from: $flavor
      to: $recipe
      data: { amount: $amount, measurement: $measurement }
    ) {
      from {
        flavorId
        name
      }
      to {
        recipeId
        name
      }
    }
  }
`;

export const CREATE_COMPANY_NODE = gql`
  mutation(
    $name: String!
    $address: String
    $city: String
    $state: String
    $location: _Neo4jPointInput
    $website: String
    $facebook: String
    $phone: String
  ) {
    CreateCompany(
      name: $name
      address: $address
      city: $city
      state: $state
      location: $location
    ) {
      companyId
      name
      address
      city
      state
      location {
        latitude
        longitude
      }
    }
  }
`;

export const CREATE_FLAVOR_NODE = gql`
  mutation($name: String!, $description: String!) {
    CreateFlavor(name: $name, description: $description) {
      flavorId
      name
      description
    }
  }
`;

export const CREATE_TAG_NODE = gql`
  mutation($name: String!) {
    CreateTag(name: $name) {
      tagId
      name
    }
  }
`;

export const CREATE_RECIPE_TAG_RELATIONSHIP = gql`
  mutation($recipe: _RecipeInput!, $tag: _TagInput!) {
    AddRecipeTags(from: $recipe, to: $tag) {
      from {
        recipeId
        name
      }
      to {
        tagId
        name
      }
    }
  }
`;

export const CREATE_FLAVOR_TAG_RELATIONSHIP = gql`
  mutation($flavor: _FlavorInput!, $tag: _TagInput!) {
    AddflavorTags(from: $flavor, to: $tag) {
      from {
        flavorId
        name
      }
      to {
        tagId
        name
      }
    }
  }
`;
