document.addEventListener('DOMContentLoaded', function() {
    // Check for active session on page load
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    
    if (currentUser) {
        // Update UI for logged-in user
        updateUserUI(currentUser);
        
        // Show login success message
        showLoginSuccess(currentUser.name);
    }
    
    // All your existing JavaScript code
    
    function updateUserUI(user) {
        const userActions = document.querySelector('.user-actions');
        if (userActions) {
            userActions.innerHTML = `
                <a href="#" class="watchlist"><i class="fas fa-bookmark"></i> Watchlist</a>
                <div class="user-profile">
                    <div class="user-dropdown">
                     <span>Hi, ${user.name}</span>
                        <button id="logoutBtn"> <i class="fas fa-sign-in-alt"> </i></button>
                    </div>
                </div>
                
                <div class="theme-toggle">
                    <button id="themeToggleBtn"><i class="fas fa-moon"></i></button>
                </div>
            `;
            
            // Add event listeners for the new buttons
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    logoutUser();
                });
            }
            
            const lockAccountBtn = document.getElementById('lockAccountBtn');
            if (lockAccountBtn) {
                lockAccountBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    lockAccount(user.email);
                });
            }
        }
    }
    
    function showLoginSuccess(username) {
        const successDiv = document.createElement('div');
        successDiv.className = 'login-success';
        successDiv.textContent = `Welcome back, ${username}!`;
        document.body.appendChild(successDiv);
        
        // Remove the element after animation completes
        setTimeout(() => {
            successDiv.remove();
        }, 3500);
    }
    
    function logoutUser() {
        localStorage.removeItem('current_user');
        window.location.href = 'login.html';
    }
    
    function lockAccount(email) {
        if (confirm('Are you sure you want to lock your account? You will need to contact support to unlock it.')) {
            const userDB = JSON.parse(localStorage.getItem('user_database'));
            const userIndex = userDB.users.findIndex(u => u.email === email);
            
            if (userIndex !== -1) {
                userDB.users[userIndex].isLocked = true;
                localStorage.setItem('user_database', JSON.stringify(userDB));
                localStorage.removeItem('current_user');
                alert('Account locked successfully!');
                window.location.href = 'login.html';
            }
        }
    }
    
    // Rest of your existing JavaScript code
});


// Add this to your existing script section
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('current_user'));
    const signInBtn = document.getElementById('signInBtn');
    const signOutBtn = document.getElementById('signOutBtn');

    if (currentUser) {
        signInBtn.style.display = 'none';
        signOutBtn.style.display = 'inline-block';
        alert('Login successful! Welcome back.');
    }

    // Logout functionality
    signOutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('current_user');
        signInBtn.style.display = 'inline-block';
        signOutBtn.style.display = 'none';
        alert('You have been logged out successfully.');
    });

    // Rest of your existing JavaScript...
});