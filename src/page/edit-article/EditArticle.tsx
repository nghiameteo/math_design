// import { ErrorMessage, Field, Form, Formik } from "formik";
import { useFormik } from "formik";
import * as Yup from 'yup'

import { Article, NewArticle } from "../../app/models";
import { Box, Button, TextField, Typography } from "@mui/material";


interface OwnProps {
    onSubmit: (data: NewArticle) => void;
    isLoading: boolean;
    article?: Article;
};
const EditArticleSchema = Yup.object().shape({
    title: Yup.string().min(1, 'Too short').required('Title is required.'),
    description: Yup.string().required('Description is required.'),
    body: Yup.string().required('Body is required.'),
    // tagList: Yup.string().required('Tag list is required.'),
})

const EditArticle = ({ onSubmit, isLoading, article }: OwnProps) => {
    const initialValues = {
        title: article?.title || "",
        description: article?.description || "",
        body: article?.body || "",
        tagList: article?.tagList || [],
    }
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
        <Box sx={{maxWidth: 'xl'}}>
            <Typography variant="h4" gutterBottom sx={{ m: 1, p: 1, color: '#003300', textAlign: 'center', }}>Update Article</Typography>
            <form onSubmit={formik.handleSubmit}>
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
                /><br /><br />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                /><br /><br />
                <TextField
                    fullWidth
                    id="body"
                    name="body"
                    label="body"
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}
                /><br /><br />
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
                /><br /><br />
                <Button color="primary" variant="contained" fullWidth type="submit" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Publish Article'}
                </Button>
            </form>
        </Box>
    )
}

export default EditArticle