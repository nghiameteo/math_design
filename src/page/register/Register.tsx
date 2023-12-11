// import { ErrorMessage, Field, Form, Formik } from "formik";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup'

import { NewUser } from "../../app/models";
import { Button, TextField } from "@mui/material";

interface OwnProps {
    onSubmit: (data: NewUser) => void;
    isLoading: boolean;
};
const SignUpSchema = Yup.object().shape({
    username: Yup.string().min(3, 'Username too short!').max(50, 'Username too long!').required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password too short!').max(50, 'Password too long!').required('Password required')
})

const Register = ({ onSubmit, isLoading }: OwnProps) => {
    const formik = useFormik({
        initialValues: {
            username: "",
            email: '',
            password: "",
        },
        validationSchema: SignUpSchema,
        onSubmit: ({ username, email, password }) => {
            const registerData: NewUser = {
                username,
                email,
                password
            };
            onSubmit(registerData);
        },

    });
    return (
        // <Formik 
        //     initialValues={{
        //         username: "",
        //         email: '',
        //         password: "",
        //     }
        //     }
        //     validationSchema={SignUpSchema}
        //     onSubmit={
        //         ({ username, email, password }) => {                    
        //             const registerData: NewUser = {
        //                 username,
        //                 email,
        //                 password
        //             };
        //             onSubmit(registerData);
        //         }
        //     }
        // >
        //     <Form className='form-register' autoComplete='off'>
        //         <h2 className="form-title">Sign up</h2>
        //         <Link to="/login">Have an account?</Link><br />
        //         <div className="form-username">
        //             <label htmlFor='username'>UserName:</label>
        //             <Field className='formControl' id='username' name='username' type='text' required />
        //             <ErrorMessage name='username'>{(msg) => <div className='error'>{msg}</div>}</ErrorMessage>
        //         </div>
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
        //         <button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Register'}</button>

        //     </Form>

        // </Formik>
        <div>
            <h2 className="form-title">Sign up</h2>
            <Link to="/login">Have an account?</Link><br/><br/>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                /> <br/><br/>
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
                    {isLoading ? 'Loading...' : 'Register'}
                </Button>
            </form>
        </div>
    )

}

export default Register