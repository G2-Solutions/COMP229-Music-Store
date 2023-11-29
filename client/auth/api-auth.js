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
      sessionStorage.setItem('jwtToken', data.token);
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

    sessionStorage.removeItem('jwtToken');

    return data;
  } catch(err) {
    console.log(err)
  }
}

export {
  signin,
  signout
}