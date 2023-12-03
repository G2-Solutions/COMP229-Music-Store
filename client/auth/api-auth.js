import jwt from 'jsonwebtoken';

const signin = async (user) => {
  try {
    let response = await fetch('/auth/signin/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user)
    })
    const data = await response.json();
    
    if (data.token) {
      sessionStorage.setItem('jwt', data.token);
    }

    return data;
  } catch(err) {
    console.log(err)
  }
}

const signout = async () => {
  try {
    let response = await fetch('/auth/signout/', { method: 'GET' })
    const data = await response.json();

    sessionStorage.removeItem('jwt');

    return data;
  } catch(err) {
    console.log(err)
  }
}

export {
  signin,
  signout
}