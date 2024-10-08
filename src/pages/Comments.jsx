import { Box, Button, TextField, Alert } from "@mui/material";
import Item from "../components/Item";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { queryClient } from "../ThemedApp";
import { useApp } from "../ThemedApp";
import { useRef } from "react";
import { getToken, postComment } from "../libs/fetcher";
const api = import.meta.env.VITE_API;
export default function Comments() {
  const contentInput = useRef();
  const { setGlobalMsg, auth } = useApp();
  const token = getToken();
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, isError, error, data } = useQuery("comments", async () => {
    const res = await fetch(`${api}/content/posts/${id}`);
    return res.json();
  });

  const removePost = useMutation(async (id) => {
    await fetch(`${api}/content/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    navigate("/");
    setGlobalMsg("A post deleted");
  });

  const removeComment = useMutation(
    async (id) => {
      await fetch(`${api}/content/comments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    },
    {
      onMutate: (id) => {
        queryClient.cancelQueries("comments");
        queryClient.setQueryData("comments", (old) => {
          old.comments = old.comments.filter((comment) => comment.id !== id);
          return { ...old };
        });
        setGlobalMsg("A comment deleted");
      },
    }
  );

  const addComment = useMutation((content) => postComment(content, id), {
    onSuccess: async (comment) => {
      await queryClient.cancelQueries("comments");
      await queryClient.setQueryData("comments", (old) => {
        old.comments = [...old.comments, comment];
        return { ...old };
      });
      setGlobalMsg("A comment added");
    },
  });

  if (isError) {
    return (
      <Box>
        <Alert severity="warning">{error.message}</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return <Box sx={{ textAlign: "center" }}>Loading...</Box>;
  }

  return (
    <Box>
      <div style={{ backgroundColor: "red" }}>
        <Item primary item={data} remove={removePost.mutate} />
      </div>
      {data.comments.map((comment) => {
        return (
          <Item
            comment
            key={comment.id}
            item={comment}
            remove={removeComment.mutate}
          />
        );
      })}
      {auth && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const content = contentInput.current.value;
            if (!content) return false;
            addComment.mutate(content);
            e.currentTarget.reset();
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              mt: 3,
            }}
          >
            <TextField
              inputRef={contentInput}
              multiline
              placeholder="Your Comment"
            />
            <Button type="submit" variant="contained">
              Reply
            </Button>
          </Box>
        </form>
      )}
    </Box>
  );
}
