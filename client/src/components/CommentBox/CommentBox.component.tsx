import { useMutation } from "@apollo/client";
import { Box, Button, FormControl, Input } from "@chakra-ui/core";
import React, { FormEvent, FormEventHandler } from "react";
import { CREATE_RECIPE_COMMENT } from "../../graphql/mutations"
import { CreateRandomID } from '../../helpers/functions'
// import { Recipe } from "../../@types/schema";



const CommentBox: React.FC<any> = ({recipe}) => {

  const [comment, setComment] = React.useState('');

  const [createComment] = useMutation(CREATE_RECIPE_COMMENT, {
    onCompleted: () => {
      setComment("");
    },
    onError: (error) => {
      console.log(error);
    },
    // refetchQueries: [{query: GET_RECIPE_COMMENTS}]
  });

  const handleCommentSubmit = (e: any) => {
    e.preventDefault();
    const currentDateTime = new Date().toISOString();

    const commentPayload = {
      text: comment,
      userId: "84eb9ea8-d0ed-4d76-a121-2b4855c738dd",
      recipeId: recipe.recipeId,
      commentId: CreateRandomID(32),
      published: currentDateTime,
    };

    console.log(commentPayload)

    createComment({
      variables: commentPayload,
    });

      
  }

  return (
    <Box className="mb-3">
      <form onSubmit={(e: React.FormEvent) => handleCommentSubmit(e)}>
        <FormControl className="flex flex-row w-full">
          <Input
            value={comment}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setComment(e.target.value)
            }
            className="rounded-lg"
          />
          <Button type="submit">Send</Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default CommentBox;
