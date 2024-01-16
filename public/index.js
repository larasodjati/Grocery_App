document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM ready')

    const loginButton = document.getElementById('login-button')
    if (loginButton) {
        console.log('Login button found')
        loginButton.addEventListener('click', async function () {
            console.log('Login button clicked')
            const username = document.getElementById('username').value
            const password = document.getElementById('password').value
            console.log('Username:', username)
            console.log('Password:', password)

            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            }).catch((error) => console.error('Fetch error:', error))
            console.log('Login response:', response)
            if (response.ok) {
                document.cookie = `username=${username}; path=/`

                const groceryListResponse = await fetch('/lists', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                console.log('Grocery List:', groceryListResponse)
                if (groceryListResponse.ok) {
                    const groceryListData = await groceryListResponse.json()
                    console.log(groceryListData)

                    viewGroceryList(groceryListData)
                } else {
                    alert('Failed to get grocery list')
                }
            } else {
                alert('Login failed')
            }
        })
    }
    document
        .getElementById('login-cancel')
        .addEventListener('click', function () {
            document.getElementById('username').value = ''
            document.getElementById('password').value = ''
        })

    document
        .getElementById('register-button')
        .addEventListener('click', async function () {
            const name = document.getElementById('name').value
            const birthday = document.getElementById('birthday').value
            const username = document.getElementById('register-username').value
            const password = document.getElementById('register-password').value

            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, birthday, username, password }),
            })

            if (response.ok) {
                alert('Registration successful')
            } else {
                alert('Registration failed')
            }
        })

    document
        .getElementById('register-cancel')
        .addEventListener('click', function () {
            document.getElementById('name').value = ''
            document.getElementById('birthday').value = ''
            document.getElementById('register-username').value = ''
            document.getElementById('register-password').value = ''
        })

    function viewGroceryList(groceryListData) {
        const groceryListElement = document.getElementById('grocery-lists')

        groceryListElement.innerHTML = ''

        groceryListData.forEach((item) => {
            const rowData = item.row_to_json
            const listItem = document.createElement('div')
            listItem.textContent = `ID no :${rowData.id}, Grocery List Name: ${rowData.list_name}, User ID: ${rowData.users_id}`
            groceryListElement.appendChild(listItem)
        })
    }
})
