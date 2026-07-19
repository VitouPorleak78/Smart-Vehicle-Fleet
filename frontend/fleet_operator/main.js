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
  const views = ['dashboard', 'expense', 'analytics', 'add-driver', 'settings'];

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

  if (!sidebar.classList.contains('-translate-x-full') && window.innerWidth < 1024) {
    toggleSidebar();
  }
}

const expenseTableBody = document.getElementById('expense-table-body');
const dashboardCards = document.querySelectorAll('[data-dashboard-card]');
const dashboardOverlay = document.getElementById('dashboard-detail-overlay');
const dashboardCloseBtn = document.getElementById('dashboard-detail-close');
const dashboardDetails = document.querySelectorAll('[data-dashboard-detail]');
const dashboardEmptyPanel = document.getElementById('dashboard-detail-empty');
const activeFleetList = document.getElementById('active-fleet-list');
const totalMileageList = document.getElementById('total-mileage-list');
const maintenanceDueList = document.getElementById('maintenance-due-list');
const criticalAlertsList = document.getElementById('critical-alerts-list');

const dashboardData = {
  'active-fleet': [
    { id: 'FLT-8829', model: 'Toyota Camry', driver: 'Marcus Chen', status: 'On Route' },
    { id: 'FLT-4130', model: 'Toyota Wild Truck', driver: 'Sarah Jenkins', status: 'Loading' },
    { id: 'FLT-2092', model: 'Ford Transit', driver: 'Priya Singh', status: 'Idle' },
    { id: 'FLT-7214', model: 'Chevy Silverado', driver: 'Diego Torres', status: 'Departing' },
    { id: 'FLT-3341', model: 'Honda Accord', driver: 'Mia Davis', status: 'Refueling' },
    { id: 'FLT-5568', model: 'Nissan Titan', driver: 'Noah Patel', status: 'Loading' },
    { id: 'FLT-4490', model: 'Ram 1500', driver: 'Avery Brooks', status: 'On Route' },
    { id: 'FLT-1011', model: 'GMC Sierra', driver: 'Lina Park', status: 'Parking' },
  ],
  'total-mileage': [
    { id: 'FLT-8829', mileage: '24,300 km' },
    { id: 'FLT-4130', mileage: '17,900 km' },
    { id: 'FLT-2092', mileage: '15,450 km' },
    { id: 'FLT-7214', mileage: '13,800 km' },
    { id: 'FLT-3341', mileage: '11,600 km' },
    { id: 'FLT-5568', mileage: '10,850 km' },
    { id: 'FLT-4490', mileage: '10,150 km' },
    { id: 'FLT-1011', mileage: '10,450 km' },
  ],
  'maintenance-due': [
    { id: 'FLT-3341', task: 'Oil change', date: 'Jul 14, 2026' },
    { id: 'FLT-8829', task: 'Tire rotation', date: 'Jul 15, 2026' },
    { id: 'FLT-4130', task: 'Brake inspection', date: 'Jul 16, 2026' },
    { id: 'FLT-5568', task: 'Filter replacement', date: 'Jul 17, 2026' },
    { id: 'FLT-2092', task: 'Fluid top-up', date: 'Jul 18, 2026' },
    { id: 'FLT-7214', task: 'Alignment check', date: 'Jul 19, 2026' },
    { id: 'FLT-4490', task: 'Battery service', date: 'Jul 20, 2026' },
    { id: 'FLT-1011', task: 'Coolant flush', date: 'Jul 21, 2026' },
    { id: 'FLT-1122', task: 'Safety inspection', date: 'Jul 22, 2026' },
    { id: 'FLT-2233', task: 'Exhaust check', date: 'Jul 23, 2026' },
    { id: 'FLT-3345', task: 'Suspension check', date: 'Jul 24, 2026' },
    { id: 'FLT-4456', task: 'Transmission service', date: 'Jul 25, 2026' },
    { id: 'FLT-5567', task: 'AC maintenance', date: 'Jul 26, 2026' },
    { id: 'FLT-6678', task: 'Wheel balancing', date: 'Jul 27, 2026' },
  ],
  'critical-alerts': [
    { id: 'FLT-3341', issue: 'Brake fluid low', date: 'Jul 12, 2026' },
    { id: 'FLT-2092', issue: 'Engine overheating', date: 'Jul 13, 2026' },
    { id: 'FLT-5568', issue: 'Transmission fault', date: 'Jul 15, 2026' },
  ],
};

function hideAllDashboardDetails() {
  dashboardDetails.forEach((detail) => detail.classList.add('hidden'));
  dashboardCards.forEach((card) => card.classList.remove('ring-2', 'ring-blue-500'));
  if (dashboardEmptyPanel) {
    dashboardEmptyPanel.classList.remove('hidden');
  }
}

function fillTableRows(listContainer, rowsHtml) {
  if (!listContainer) return;
  listContainer.innerHTML = rowsHtml.join('');
}

function openDashboardOverlay() {
  if (dashboardOverlay) {
    dashboardOverlay.classList.remove('hidden');
  }
}

function closeDashboardOverlay() {
  if (dashboardOverlay) {
    dashboardOverlay.classList.add('hidden');
  }
  hideAllDashboardDetails();
}

function showDashboardDetail(detailKey) {
  openDashboardOverlay();
  hideAllDashboardDetails();
  const detailPanel = document.getElementById(`dashboard-detail-${detailKey}`);
  if (detailPanel) {
    detailPanel.classList.remove('hidden');
  }
  if (dashboardEmptyPanel) {
    dashboardEmptyPanel.classList.add('hidden');
  }
  const activeCard = document.querySelector(`[data-dashboard-card="${detailKey}"]`);
  if (activeCard) {
    activeCard.classList.add('ring-2', 'ring-blue-500');
  }
}

if (dashboardCloseBtn) {
  dashboardCloseBtn.addEventListener('click', closeDashboardOverlay);
}

if (dashboardOverlay) {
  dashboardOverlay.addEventListener('click', (event) => {
    if (event.target === dashboardOverlay) {
      closeDashboardOverlay();
    }
  });
}

function populateDashboardDetails() {
  if (activeFleetList) {
    fillTableRows(activeFleetList, dashboardData['active-fleet'].map((vehicle) => `
      <tr>
        <td class="py-3 px-4">${vehicle.id}</td>
        <td class="py-3 px-4">${vehicle.model}</td>
        <td class="py-3 px-4">${vehicle.driver}</td>
        <td class="py-3 px-4 text-slate-700">${vehicle.status}</td>
      </tr>
    `));
  }

  if (totalMileageList) {
    fillTableRows(totalMileageList, dashboardData['total-mileage'].map((vehicle) => `
      <tr>
        <td class="py-3 px-4">${vehicle.id}</td>
        <td class="py-3 px-4 font-bold text-slate-900">${vehicle.mileage}</td>
      </tr>
    `));
  }

  if (maintenanceDueList) {
    fillTableRows(maintenanceDueList, dashboardData['maintenance-due'].map((item) => `
      <tr>
        <td class="py-3 px-4">${item.id}</td>
        <td class="py-3 px-4">${item.task}</td>
        <td class="py-3 px-4">${item.date}</td>
      </tr>
    `));
  }

  if (criticalAlertsList) {
    fillTableRows(criticalAlertsList, dashboardData['critical-alerts'].map((alert) => `
      <tr>
        <td class="py-3 px-4">${alert.id}</td>
        <td class="py-3 px-4">${alert.issue}</td>
        <td class="py-3 px-4">${alert.date}</td>
      </tr>
    `));
  }
}

dashboardCards.forEach((card) => {
  card.addEventListener('click', () => {
    const detailKey = card.dataset.dashboardCard;
    if (detailKey) {
      showDashboardDetail(detailKey);
    }
  });
});

populateDashboardDetails();

function updateExpenseRowStatus(row, status) {
  const approveBtn = row.querySelector('button[data-action="approve"]');
  const rejectBtn = row.querySelector('button[data-action="reject"]');
  if (!approveBtn || !rejectBtn) return;

  row.classList.remove('bg-white');
  row.classList.add(status === 'approved' ? 'bg-emerald-50' : 'bg-rose-50');

  approveBtn.textContent = status === 'approved' ? 'Approved' : 'Approve';
  rejectBtn.textContent = status === 'rejected' ? 'Rejected' : 'Reject';

  approveBtn.className = status === 'approved'
    ? 'bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-3 py-1 rounded-lg transition'
    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1 rounded-lg transition';

  rejectBtn.className = status === 'rejected'
    ? 'bg-rose-500 hover:bg-rose-600 text-white font-bold px-3 py-1 rounded-lg transition'
    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold px-3 py-1 rounded-lg transition';

  approveBtn.disabled = status === 'rejected';
  rejectBtn.disabled = status === 'approved';
}

if (expenseTableBody) {
  expenseTableBody.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (!button) return;

    const row = button.closest('tr');
    if (!row) return;

    const action = button.dataset.action;
    if (action === 'approve') {
      updateExpenseRowStatus(row, 'approved');
    } else if (action === 'reject') {
      updateExpenseRowStatus(row, 'rejected');
    }
  });
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

// Add Driver form handlers
const saveDriverBtn = document.getElementById('save-driver-btn');
const cancelDriverBtn = document.getElementById('cancel-driver-btn');
const addDriverForm = document.getElementById('add-driver-form');
const driverPhotoInput = document.getElementById('driver-photo-input');
const driverPhotoPreview = document.getElementById('driver-photo-preview');
const driverPhotoPlaceholder = document.getElementById('driver-photo-placeholder');
const driverListBody = document.getElementById('driver-list-body');

let drivers = [];
let currentDriverPhoto = null; // Data URL

function loadDrivers() {
  try {
    const raw = localStorage.getItem('drivers');
    drivers = raw ? JSON.parse(raw) : [];
  } catch (e) {
    drivers = [];
  }
}

function saveDriversToStorage() {
  try {
    localStorage.setItem('drivers', JSON.stringify(drivers));
  } catch (e) {
    console.warn('Could not save drivers', e);
  }
}

function renderDriverList() {
  if (!driverListBody) return;
  if (drivers.length === 0) {
    driverListBody.innerHTML = `<tr><td class="py-4 px-4 text-slate-400" colspan="5">No drivers added yet.</td></tr>`;
    return;
  }
  driverListBody.innerHTML = drivers.map((d) => `
    <tr class="align-middle">
      <td class="py-3 px-3 flex items-center gap-3">
        <img src="${d.photo || ''}" class="w-10 h-10 rounded-full object-cover border" alt="" />
        <div>
          <div class="font-bold text-slate-900">${d.first} ${d.last}</div>
          <div class="text-[11px] text-slate-400">${d.email || ''}</div>
        </div>
      </td>
      <td class="py-3 px-3 text-slate-700">${d.phone || ''}</td>
      <td class="py-3 px-3 text-slate-700">${d.vehicle || ''}</td>
      <td class="py-3 px-3 text-slate-700">${d.license || ''}</td>
      <td class="py-3 px-3 text-right"><button data-id="${d.id}" class="remove-driver-btn bg-rose-500 hover:bg-rose-600 text-white text-xs px-2.5 py-1 rounded">Remove</button></td>
    </tr>
  `).join('');
}

function clearAddDriverForm() {
  if (!addDriverForm) return;
  addDriverForm.querySelectorAll('input').forEach((i) => i.value = '');
  const sel = addDriverForm.querySelector('select');
  if (sel) sel.selectedIndex = 0;
  if (driverPhotoInput) driverPhotoInput.value = '';
  if (driverPhotoPreview) {
    driverPhotoPreview.src = '';
    driverPhotoPreview.classList.add('hidden');
  }
  if (driverPhotoPlaceholder) driverPhotoPlaceholder.classList.remove('hidden');
  currentDriverPhoto = null;
}

if (driverPhotoInput) {
  driverPhotoInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      currentDriverPhoto = ev.target.result;
      if (driverPhotoPreview) {
        driverPhotoPreview.src = currentDriverPhoto;
        driverPhotoPreview.classList.remove('hidden');
      }
      if (driverPhotoPlaceholder) driverPhotoPlaceholder.classList.add('hidden');
    };
    reader.readAsDataURL(file);
  });
}

if (cancelDriverBtn) {
  cancelDriverBtn.addEventListener('click', () => {
    clearAddDriverForm();
    // stay on add-driver view
  });
}

if (saveDriverBtn) {
  saveDriverBtn.addEventListener('click', () => {
    const first = document.getElementById('driver-first')?.value.trim() || '';
    const last = document.getElementById('driver-last')?.value.trim() || '';
    const email = document.getElementById('driver-email')?.value.trim() || '';
    const phone = document.getElementById('driver-phone')?.value.trim() || '';
    const vehicle = document.getElementById('driver-vehicle')?.value || '';
    const license = document.getElementById('driver-license')?.value.trim() || '';

    if (!first || !last) {
      alert('Please enter the driver\'s first and last name.');
      return;
    }

    if (!currentDriverPhoto) {
      alert('Please choose a profile image for the driver.');
      return;
    }

    const driver = {
      id: Date.now().toString(),
      first, last, email, phone, vehicle, license, photo: currentDriverPhoto,
    };

    drivers.unshift(driver);
    saveDriversToStorage();
    renderDriverList();
    clearAddDriverForm();
  });
}

// Delegate remove button
document.addEventListener('click', (e) => {
  const btn = e.target.closest && e.target.closest('.remove-driver-btn');
  if (!btn) return;
  const id = btn.getAttribute('data-id');
  drivers = drivers.filter((d) => d.id !== id);
  saveDriversToStorage();
  renderDriverList();
});

// initialize
loadDrivers();
renderDriverList();
