import Router from "next/router";

export default async function SignOut (){
    const response = await fetch('/api/users/signout', {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        }
    });

    if (response.ok){
        Router.push('/auth/signin');
    } else {
        Router.push('/auth/signin');
    }


};