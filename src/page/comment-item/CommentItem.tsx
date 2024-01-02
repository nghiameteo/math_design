import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Card, Container, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Comment, NewComment, User } from "../../app/models";
import CommentDetail from "../comment-detail/CommentDetail";

interface OwnProps {
  isLoading: boolean;
  comments: Comment[];
  currentUser?: User;
  onSubmit: (data: NewComment) => void;
  onDelete: (id: number) => void;
}

const SigInSchema = Yup.object().shape({
  body: Yup.string().min(1, "Comment too short"),
});

const CommentItem = ({
  isLoading,
  comments,
  currentUser,
  onSubmit,
  onDelete,
}: OwnProps) => {
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    validationSchema: SigInSchema,
    onSubmit: ({ body }, { resetForm }) => {
      const bodyComment: NewComment = { body };
      onSubmit(bodyComment);
      resetForm({});
    },
  });

  return (
    <>
      {!!currentUser && (
        // <Formik
        //     initialValues={{
        //         body: "",
        //     }}
        //     validationSchema={SigInSchema}
        //     onSubmit={
        //         ({ body }, {resetForm}) => {
        //             const bodyComment: NewComment = { body };
        //             onSubmit(bodyComment);
        //             resetForm({});
        //         }
        //     }
        // >
        //     <Form className='form-comment-container' autoComplete='off'>
        //         <div className="form-comment">
        //             <label htmlFor='comment'> Comment:</label>
        //             <Field className='formControl' id='comment' name='body' type='text' required />
        //             <ErrorMessage name='body'>{(msg) => <div className='errors'>{msg}</div>}</ErrorMessage>
        //         </div>

        //         <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Post Comment'}</button>

        //     </Form>
        // </Formik>
        <Box>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="body"
              name="body"
              label="comment"
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.body && Boolean(formik.errors.body)}
              helperText={formik.touched.body && formik.errors.body}
            />
            <br />
            <br />
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Post Comment"}
            </Button>
          </form>
        </Box>
      )}
      <Container maxWidth='xl' sx={{width: '75%'}}>
        {comments.length > 0 &&
          comments.map((comment) => (
            <Card key={comment.id}>
              <CommentDetail comment={comment} onDelete={onDelete} currentUser={currentUser}/>              
            </Card>
          ))}
      </Container>
    </>
  );
};

export default CommentItem;
