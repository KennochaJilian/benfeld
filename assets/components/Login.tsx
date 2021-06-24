import React from 'react'

export const Login = () => {

    const onSubmit = (event) => {
        event.preventDefault()
        console.log(event)
    }

    return(
        <React.Fragment>
            <p> Login</p>
            <form onSubmit={(values) => onSubmit(values) }>
                <input name="username" type="email" placeholder="Adresse e-mail"/>
                <input type="password" name="password" placeholder="Mot de passe"/>
                <button type="submit"> Se connecter </button>
            </form>
        </React.Fragment>
    )
}