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
    $published: String!
    $userId: String!
    $ingredients: [CustomIngredientsInput]
    $isArchived: Boolean
  ) {
    createRecipeWithIngredients(
      recipeId: $recipeId
      name: $name
      description: $description
      published: $published
      userId: $userId
      ingredients: $ingredients
      isArchived: $isArchived
    ) {
      recipeId
      name
      description
      published
      creator {
        userId
        name
      }
      parent {
        recipeId
        name
      }
      ingredients {
        amount
        measurement
        Flavor {
          flavorId
          name
        }
      }
      isArchived
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

export const ARCHIVE_RECIPE = gql`
  mutation($recipeId: ID!) {
    archiveRecipe(recipeId: $recipeId) {
      recipeId
    }
  }
`;
