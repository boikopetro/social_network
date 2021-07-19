import React from "react"
import {reduxForm, Field} from 'redux-form'
import {maxLengthCreator, required} from "../../utils/validators/validators"
import {Input} from "../common/FormsControls/FormsControls"
import {connect} from "react-redux"
import {login} from "../../redux/auth-reducer"
import {Redirect} from "react-router-dom"
import {AppStateType} from "../../redux/redux-store"
import style from "./../common/FormsControls/FormsControls.module.css"

const maxLength = maxLengthCreator(30)


const LoginForm = (props: any) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"}
                       name={"email"}
                       component={Input}
                       validate={[required, maxLength]}/>
            </div>
            <div>
                <Field placeholder={"Password"}
                       name={"password"}
                       type={"password"}
                       component={Input}
                       validate={[required, maxLength]}/>
            </div>
            <div>
                <Field type={"checkbox"} name={"rememberMe"} component={Input}/> remember me
            </div>
            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({
    form: "login"
})(LoginForm)

const Login = (props: any) => {
    const onSubmit = (formData: any) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login)

