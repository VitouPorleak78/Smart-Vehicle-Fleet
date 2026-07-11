const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');

function toggleSidebar() {
  sidebar.classList.toggle('-translate-x-full');
  overlay.classList.toggle('hidden');
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', toggleSidebar);
}

if (overlay) {
  overlay.addEventListener('click', toggleSidebar);
}

function switchTab(viewName) {
  const views = ['dashboard', 'gps', 'expense', 'analytics', 'settings'];
  const searchPlaceholder = document.getElementById('search-placeholder');

  views.forEach((view) => {
    const viewEl = document.getElementById(`view-${view}`);
    const navEl = document.getElementById(`nav-${view}`);
    if (viewEl) viewEl.classList.add('hidden');
    if (navEl) navEl.classList.remove('active');
  });

  const activeView = document.getElementById(`view-${viewName}`);
  const activeNav = document.getElementById(`nav-${viewName}`);
  if (activeView) activeView.classList.remove('hidden');
  if (activeNav) activeNav.classList.add('active');

  if (searchPlaceholder) {
    searchPlaceholder.placeholder = `Search ${viewName} assets...`;
  }

  if (!sidebar.classList.contains('-translate-x-full') && window.innerWidth < 1024) {
    toggleSidebar();
  }
}

const profileImageInput = document.getElementById('profile-image-input');
const profileImageTrigger = document.getElementById('profile-image-trigger');
const profileCardImage = document.getElementById('profile-card-image');
const topProfileImage = document.getElementById('top-profile-image');

if (profileImageTrigger && profileImageInput) {
  profileImageTrigger.addEventListener('click', () => {
    profileImageInput.click();
  });

  profileImageInput.addEventListener('change', (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const imageData = loadEvent.target?.result;
      if (profileCardImage && imageData) {
        profileCardImage.src = imageData;
      }
      if (topProfileImage && imageData) {
        topProfileImage.src = imageData;
      }
    };
    reader.readAsDataURL(file);
  });
}

const editProfileBtn = document.getElementById('edit-profile-btn');
const profileInfoView = document.getElementById('profile-info-view');
const profileInfoEdit = document.getElementById('profile-info-edit');
const cancelProfileEdit = document.getElementById('cancel-profile-edit');
const saveProfileEdit = document.getElementById('save-profile-edit');
const profileNameDisplay = document.getElementById('profile-name-display');
const profileNameInput = document.getElementById('profile-name-input');
const profileEmail = document.getElementById('profile-email');
const profileEmailInput = document.getElementById('profile-email-input');
const profilePhone = document.getElementById('profile-phone');
const profilePhoneInput = document.getElementById('profile-phone-input');
const profileCompany = document.getElementById('profile-company');
const profileCompanyInput = document.getElementById('profile-company-input');
const profileDept = document.getElementById('profile-dept');
const profileDeptInput = document.getElementById('profile-dept-input');
const headerProfileName = document.getElementById('header-profile-name');

function setProfileEditVisible(isVisible) {
  if (profileInfoView) {
    profileInfoView.classList.toggle('hidden', isVisible);
  }
  if (profileInfoEdit) {
    profileInfoEdit.classList.toggle('hidden', !isVisible);
  }
}

function populateProfileInputs() {
  if (profileNameInput && profileNameDisplay) {
    profileNameInput.value = profileNameDisplay.textContent.trim();
  }
  if (profileEmailInput && profileEmail) {
    profileEmailInput.value = profileEmail.textContent.trim();
  }
  if (profilePhoneInput && profilePhone) {
    profilePhoneInput.value = profilePhone.textContent.trim();
  }
  if (profileCompanyInput && profileCompany) {
    profileCompanyInput.value = profileCompany.textContent.trim();
  }
  if (profileDeptInput && profileDept) {
    profileDeptInput.value = profileDept.textContent.trim();
  }
}

if (editProfileBtn) {
  editProfileBtn.addEventListener('click', () => {
    populateProfileInputs();
    setProfileEditVisible(true);
  });
}

if (cancelProfileEdit) {
  cancelProfileEdit.addEventListener('click', () => setProfileEditVisible(false));
}

if (saveProfileEdit) {
  saveProfileEdit.addEventListener('click', () => {
    if (profileNameDisplay && profileNameInput) {
      profileNameDisplay.textContent = profileNameInput.value.trim() || 'Alex Thompson';
    }
    if (headerProfileName && profileNameInput) {
      headerProfileName.textContent = profileNameInput.value.trim() || 'Alex Thompson';
    }
    if (profileEmail && profileEmailInput) {
      profileEmail.textContent = profileEmailInput.value.trim();
    }
    if (profilePhone && profilePhoneInput) {
      profilePhone.textContent = profilePhoneInput.value.trim();
    }
    if (profileCompany && profileCompanyInput) {
      profileCompany.textContent = profileCompanyInput.value.trim();
    }
    if (profileDept && profileDeptInput) {
      profileDept.textContent = profileDeptInput.value.trim();
    }
    setProfileEditVisible(false);
  });
}

const addUserBtn = document.getElementById('add-user-btn');
const addUserForm = document.getElementById('add-user-form');
const cancelUserForm = document.getElementById('cancel-user-form');
const submitUserBtn = document.getElementById('submit-user-btn');
const newUserName = document.getElementById('new-user-name');
const newUserEmail = document.getElementById('new-user-email');
const newUserRole = document.getElementById('new-user-role');
const userFormError = document.getElementById('user-form-error');
const userTableBody = document.getElementById('user-table-body');

function clearUserForm() {
  if (newUserName) newUserName.value = '';
  if (newUserEmail) newUserEmail.value = '';
  if (newUserRole) newUserRole.value = '';
  if (userFormError) userFormError.classList.add('hidden');
  if (submitUserBtn) submitUserBtn.disabled = true;
  [newUserName, newUserEmail, newUserRole].forEach((input) => {
    if (input) {
      input.classList.remove('border-rose-500', 'focus:border-rose-500');
      input.classList.add('border-slate-200');
    }
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateUserForm() {
  const nameFilled = Boolean(newUserName?.value.trim());
  const emailFilled = Boolean(newUserEmail?.value.trim());
  const roleFilled = Boolean(newUserRole?.value.trim());
  const emailValid = emailFilled ? isValidEmail(newUserEmail.value.trim()) : false;

  [newUserName, newUserEmail, newUserRole].forEach((input) => {
    if (!input) return;

    const shouldHighlight = input === newUserEmail
      ? emailFilled && !emailValid
      : (input === newUserName && !nameFilled) || (input === newUserRole && !roleFilled);

    input.classList.toggle('border-rose-500', shouldHighlight);
    input.classList.toggle('focus:border-rose-500', shouldHighlight);
    input.classList.toggle('border-slate-200', !shouldHighlight);
  });

  const isValid = nameFilled && emailValid && roleFilled;
  if (submitUserBtn) {
    submitUserBtn.disabled = !isValid;
  }
  return isValid;
}

if (addUserBtn && addUserForm) {
  addUserBtn.addEventListener('click', () => {
    addUserForm.classList.remove('hidden');
    clearUserForm();
    newUserName?.focus();
  });
}

if (cancelUserForm) {
  cancelUserForm.addEventListener('click', () => {
    addUserForm?.classList.add('hidden');
    clearUserForm();
  });
}

[ newUserName, newUserEmail, newUserRole ].forEach((input) => {
  if (input) {
    input.addEventListener('input', validateUserForm);
  }
});

if (submitUserBtn) {
  submitUserBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const isValid = validateUserForm();
    if (!isValid) {
      userFormError?.classList.remove('hidden');
      return;
    }

    const name = newUserName?.value.trim() || '';
    const email = newUserEmail?.value.trim() || '';
    const role = newUserRole?.value.trim() || '';
    const initials = name
      .split(' ')
      .map((part) => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'U';

    if (userTableBody) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="py-3 px-2 flex items-center gap-2.5"><div class="w-8 h-8 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-[11px]">${initials}</div><div><p class="font-bold text-slate-900">${name}</p><p class="text-[10px] text-slate-400">${email}</p></div></td>
        <td class="py-3 px-2 text-slate-700">${role}</td>
        <td class="py-3 px-2 text-emerald-600 font-bold">Active</td>
        <td class="py-3 px-2 text-slate-500">Just added</td>
      `;
      userTableBody.appendChild(row);
    }

    addUserForm?.classList.add('hidden');
    clearUserForm();
  });
}

window.switchTab = switchTab;
