// import { ErrorMessage, Field, Form, Formik } from "formik";
import { useFormik } from "formik";
import * as Yup from 'yup';

import { UpdateUser, User } from "../../app/models";
import { Button, TextField, Typography } from "@mui/material";

interface OwnProps {
    isLoading: boolean;
    user: User;
    onSubmit: (user: UpdateUser) => void;
    onLogOut: () => void;
}

const UserSchema = Yup.object().shape({
    username: Yup.string().trim().min(1, 'Too short'),
    email: Yup.string().trim().email().min(1, 'Too short'),
})

const EditSetting = ({ isLoading, user, onSubmit, onLogOut }: OwnProps) => {
    const initialUser = {
        image: user.image,
        username: user.username,
        bio: user.bio,
        email: user.email,
        password: "",
    }
    const formik = useFormik({
        initialValues: initialUser,
        enableReinitialize: true,
        validationSchema: UserSchema,
        onSubmit: ({ image, username, bio, email, password }, { resetForm }) => {
            const editUser: UpdateUser = {
                image,
                username,
                bio,
                email,
                password,
            };
            onSubmit(editUser);
            resetForm();
        },
    });
    return (
        <>
            {/* <Formik
                initialValues={initialUser}
                enableReinitialize={true}
                validationSchema={UserSchema}
                onSubmit={
                    ({ image, username, bio, email, password }, { resetForm }) => {
                        const editUser: UpdateUser = {
                            image,
                            username,
                            bio,
                            email,
                            password,
                        };
                        onSubmit(editUser);
                        resetForm();
                    }
                }
            >
                <Form>
                    <div>
                        <label htmlFor="image">Image:</label>
                        <Field id="image" name="image" type="text" required />
                    </div>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <Field id="username" name="username" type="text" required />
                        <ErrorMessage name="username">{(msg) => <div className='errors'>{msg}</div>}</ErrorMessage>
                    </div>
                    <div>
                        <label htmlFor="bio">Bio:</label>
                        <Field id="bio" name="bio" type="text" required />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <Field id="email" name="email" type="email" required />
                        <ErrorMessage name="email">{(msg) => <div className='errors'>{msg}</div>}</ErrorMessage>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <Field id="password" name="password" type="password" required />
                        <ErrorMessage name="password">{(msg) => <div className='errors'>{msg}</div>}</ErrorMessage>
                    </div>

                    <button disabled={isLoading}>{isLoading ? 'Loading...' : ' Update Setting'}</button>
                    <button onClick={onLogOut}>Or click here to logout</button>
                </Form>
            </Formik> */}

            <div>
                <Typography variant="h4" gutterBottom sx={{ m: 1, p: 1, color: '#003300', textAlign: 'center', }}>Update Setting</Typography>
                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="image"
                        name="image"
                        label="image"
                        value={formik.values.image}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={formik.touched.image && formik.errors.image}
                    /><br /><br />
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
                    /><br /><br />
                    <TextField
                        fullWidth
                        id="bio"
                        name="bio"
                        label="bio"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                        helperText={formik.touched.bio && formik.errors.bio}
                    /><br /><br />

                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}

                        helperText={formik.touched.email && formik.errors.email}
                    /><br /><br />
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
                    /><br /><br />
                    <Button color="primary" variant="contained" fullWidth type="submit" disabled={isLoading}>
                        {isLoading ? 'Loading...' : ' Update Setting'}
                    </Button><br /><br />
                    <Button color="primary" variant="contained" fullWidth type="submit" onClick={onLogOut}>
                        Or click here to logout
                    </Button>
                </form>
            </div>
        </>
    )
}

export default EditSetting