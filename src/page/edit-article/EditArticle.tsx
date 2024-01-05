// import { ErrorMessage, Field, Form, Formik } from "formik";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Article, NewArticle } from "../../app/models";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import styles from "./EditArticle.module.css";

interface OwnProps {
  onSubmit: (data: NewArticle) => void;
  isLoading: boolean;
  article?: Article;
}
const EditArticleSchema = Yup.object().shape({
  title: Yup.string().min(1, "Too short").required("Title is required."),
  description: Yup.string().required("Description is required."),
  body: Yup.string().required("Body is required."),
  // tagList: Yup.string().required('Tag list is required.'),
});

const EditArticle = ({ onSubmit, isLoading, article }: OwnProps) => {
  const initialValues = {
    title: article?.title || "",
    description: article?.description || "",
    body: article?.body || "",
    tagList: article?.tagList || [],
  };
  // const renderCurrentArticle = () => {
  //     if (article) {
  //         const currentArticle = article;
  //         return currentArticle;
  //     }
  //     else {
  //         return;
  //     }
  // }

  // useEffect(() => {
  //     renderCurrentArticle();
  // }, [])

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: EditArticleSchema,
    onSubmit: ({ title, description, body, tagList }, { resetForm }) => {
      const editArticleData: NewArticle = {
        title,
        description,
        body,
        tagList,
      };
      onSubmit(editArticleData);
      resetForm({});
    },
  });
  return (
    // <Formik
    //     initialValues={initialValues}
    //     validationSchema={EditArticleSchema}
    //     onSubmit={
    //         ({ title, description, body, tagList }, {resetForm}) => {
    //             const editArticleData: NewArticle = {
    //                 title,
    //                 description,
    //                 body,
    //                 tagList,
    //             };
    //             onSubmit(editArticleData);
    //             resetForm({});
    //         }
    //     }
    // >
    //     <Form className='form-edit-article' autoComplete='off'>
    //         <div className="form-article-tittle">
    //             <label htmlFor='title'>Tittle:</label>
    //             <Field className='formControl' id='title' name='title' type='text' required />
    //             <ErrorMessage name='title'>{(msg) => <div className='errors'>{msg}</div>}</ErrorMessage>
    //         </div>

    //         <div className="form-description">
    //             <label htmlFor='description'>Description:</label>
    //             <Field className='formControl' id='description' name='description' type='text' required />
    //             <ErrorMessage name='description'>{(msg) => <div className='errors'>{msg}</div>}</ErrorMessage>
    //         </div>

    //         <div className="form-body">
    //             <label htmlFor='body'>Body:</label>
    //             <Field className='formControl' id='body' name='body' type='text' required />
    //             <ErrorMessage name='body'>{(msg) => <div className='errors'>{msg}</div>}</ErrorMessage>
    //         </div>

    //         <div className="form-tagList">
    //             <label htmlFor='tagList'>TagList:</label>
    //             <Field className='formControl' id='tagList' name='tagList' type='text' required />
    //             <ErrorMessage name='tagList'>{(msg) => <div className='errors'>{msg}</div>}</ErrorMessage>
    //         </div>

    //         <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Publish Article'}</button>

    //     </Form>
    // </Formik>
    <Container className={styles.container} sx={{ maxWidth: "xl" }}>
      <Typography
        className={styles.typoFirst}
        variant="h4"
        gutterBottom
        sx={{ m: 1, p: 1, color: "#003300", textAlign: "center" }}
      >
        Update Article
      </Typography>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          fullWidth
          id="description"
          name="description"
          label="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <TextField
          fullWidth
          id="body"
          name="body"
          label="body"
          multiline
          minRows={2}
          maxRows={6}
          placeholder="write something"
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.body && Boolean(formik.errors.body)}
          helperText={formik.touched.body && formik.errors.body}
        />
        <TextField
          fullWidth
          id="tagList"
          name="tagList"
          label="tagList"
          type="text"
          value={formik.values.tagList}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.tagList && Boolean(formik.errors.tagList)}
          helperText={formik.touched.tagList && formik.errors.tagList}
        />
        <Box className={styles.box}>
          <Button
            className={styles.button}
            color="primary"
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Publish Article"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EditArticle;
