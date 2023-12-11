// import { ErrorMessage, Field, Form, Formik } from "formik";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup'

import { LoginUser } from "../../app/models";
import { Button, TextField } from "@mui/material";

interface OwnProps {
    onSubmit: (data: LoginUser) => void;
    isLoading: boolean;
};
const SigInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required.'),
    password: Yup.string().min(6, 'Password must be at least 5 characters long').required('Password is required.')
})

const Login = ({ onSubmit, isLoading }: OwnProps) => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: SigInSchema,
        onSubmit: ({ email, password }) => {
            const loginData: LoginUser = {
                email,
                password
            };
            onSubmit(loginData);
        },

    });
    return (
        // <Formik
        //     initialValues={{
        //         email: "",
        //         password: "",
        //     }}
        //     validationSchema={SigInSchema}
        //     onSubmit={
        //         ({ email, password }) => {
        //             const loginData: LoginUser = {
        //                 email,
        //                 password
        //             };
        //             onSubmit(loginData);
        //         }
        //     }
        // >
        //     <Form className='form-login' autoComplete='off'>
        //         <h2 className="form-title">Sign in</h2>
        //         <Link to="/register">Need an account?</Link><br></br>

        //         <div className="form-email">
        //             <label htmlFor='email'> Email:</label>
        //             <Field className='formControl' id='email' name='email' type='email' required />
        //             <ErrorMessage name='email'>{(msg) => <div className='errors'>{msg}</div>}</ErrorMessage>
        //         </div>

        //         <div className="form-passWord">
        //             <label htmlFor='password'>Password:</label>
        //             <Field className='formControl' id='password' name='password' type='password' required />
        //             <ErrorMessage name='password'>{(msg) => <div className='errors'>{msg}</div>}</ErrorMessage>
        //         </div>

        //         <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Login'}</button>

        //     </Form>
        // </Formik>
        <div>
            <h2 className="form-title">Sign in</h2>
               <Link to="/register">Need an account?</Link><br/><br/>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                /><br/><br/>
                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                /><br/><br/>
                <Button color="primary" variant="contained" fullWidth type="submit"disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Login'}
                </Button>
            </form>
        </div>
    )
}
export default Login