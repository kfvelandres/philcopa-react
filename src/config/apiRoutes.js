export const API_BASE_URL = import.meta.env.MODE === 'development' ? 'https://localhost/phcopa/api/v1' : 'https://www.tpwcopa.com/phcopa/api/v1'

// Authentication
export const LOGIN_API_URL = '/auth/login'
export const FORGOT_PASSWORD_API_URL = '/api/v1/auth/forgot-password'
export const RESET_PASSWORD_API_URL = '/api/v1/auth/reset-password'
export const CHANGE_PASSWORD_API_URL = '/api/v1/auth/change-password'
export const REFRESH_TOKEN_API_URL = API_BASE_URL + ''
export const EXTERNAL_LOGIN_API_URL = API_BASE_URL + ''
export const LOGOUT_API_URL = API_BASE_URL + ''

// User - These API is for use to view OTHER
export const GET_USERS_API_URL = '/users' // GET LIST OF USERS
export const INVITE_USER_API_URL = '/users/invite' // INVITE OTHER USER
export const GET_USER_PROFILE_API_URL = '/api/v1/profile/getProfileByUser?id={id}&userId={userId}' // GET OTHER'S PROFILE
export const UPDATE_USER_API_URL = '/api/v1/profile/updateProfileByUser' // UPDATE OTHER'S PROFILE
export const UPLOAD_USER_AVATAR_API_URL = '/api/v1/users/upload-avatar' // UPDATE OTHER'S AVATAR

// Users
// export const GET_COORDINATORS_API_URL = '/api/v1/profile/companion?profileId={profileId}' // GET LIST OF COORDINATOR
export const CREATE_USER_API_URL = '/users/register' // CREATE COORDINATOR
// export const UPDATE_COORDINATOR_API_URL = '/api/v1/profile/companion' // UPDATE COORDINATOR - PUT
// export const DELETE_COORDINATOR_API_URL = '/api/v1/profile/companion?id={id}' // DELETE COORDINATOR

// Competition
// export const GET_COMPETITIONS_API_URL = '/api/v1/profile/companion?profileId={profileId}' // GET LIST OF COMPETITIONS
export const CREATE_COMPETITION_API_URL = '/competition/create' // CREATE COMPETITION
// export const UPDATE_COMPETITION_API_URL = '/api/v1/profile/companion' // UPDATE COMPETITION - PUT
// export const DELETE_COMPETITION_API_URL = '/api/v1/profile/companion?id={id}' // DELETE COMPETITION

// Contestants
export const GET_CONTESTANTS_API_URL = '/users/contestant-list' // GET LIST OF CONTESTANTS
export const CREATE_CONTESTANT_API_URL = '/users/contestant' // CREATE CONTESTANT
// export const UPDATE_CONTESTANT_API_URL = '/api/v1/profile/companion' // UPDATE CONTESTANT - PUT
// export const DELETE_CONTESTANT_API_URL = '/api/v1/profile/companion?id={id}' // DELETE CONTESTANT

// Passers
//export const UPDATE_MEMBER_PROFILE_API_URL = API_BASE_URL + '/api/v1/profile/getProfileByUser'

// Profile - These API is for used on SELF
export const GET_PROFILE_API_URL = '/profile/{id}' // GET OWN PROFILE
export const REGISTER_PROFILE_API_URL = '/api/v1/users/register' // COMPLETE REGISTRATION OF YOUR PROFILE
export const UPDATE_PROFILE_API_URL = '/api/v1/profile/updateProfile' // UPDATE YOUR PROFILE
export const UPLOAD_AVATAR_API_URL = '/api/v1/profile/upload-avatar' // UPDATE OTHER'S AVATAR

//export const GET_USER_PROFILE_API_URL = '/api/v1/profile'
//export const CREATE_USER_PROFILE_API_URL = '/api/v1/profile/onboardUser'

// Address API
export const GET_REGION_API_URL = '/region'
export const GET_PROVINCE_API_URL = '/province?region={region}'
export const GET_CITY_API_URL = '/city?province={province}'
export const GET_BARANGAY_API_URL = '/baranggay?province={province}&city={city}'

// Companions
export const GET_COMPANIONS_API_URL = '/api/v1/profile/companion?profileId={profileId}' // GET LIST OF COMPANIONS
export const CREATE_COMPANION_API_URL = '/api/v1/profile/companion' // CREATE COMPANION
export const UPDATE_COMPANION_API_URL = '/api/v1/profile/companion' // UPDATE COMPANION - PUT
export const DELETE_COMPANION_API_URL = '/api/v1/profile/companion?id={id}' // DELETE COMPANION

// Group Members
export const GET_GROUP_MEMBERS_API_URL = '/api/v1/profile/group-member?profileId={profileId}' // GET LIST OF GROUP MEMBERS
export const CREATE_GROUP_MEMBER_API_URL = '/api/v1/profile/group-member' // CREATE GROUP_ MEMBER
export const UPDATE_GROUP_MEMBER_API_URL = '/api/v1/profile/group-member' // UPDATE GROUP_ MEMBER - PUT
export const DELETE_GROUP_MEMBER_API_URL = '/api/v1/profile/group-member?id={id}' // DELETE GROUP MEMBER

export const GET_DASHBOARD_API_URL = '/api/v1/dashboard/getDashboardByProfile?userId={id}'
export const GET_DASHBOARDDETAIL_API_URL = '/api/v1/dashboard/getListByProfile?userId={userId}&type={type}'

export const GET_USERPAYMENT_API_URL = '/api/v1/payment/findPaymentByProfile?profileId={profileId}&paymentType={paymentType}'

export const ADD_USERPAYMENT_API_URL = '/api/v1/payment/addPayment'
export const DELETE_USERPAYMENT_API_URL = '/api/v1/payment/deletePayment?paymentId={paymentId}'

export const GET_USERDOCUMENT_API_URL = '/api/v1/document/findDocImage?profileId={profileId}'
export const GET_USERDOCUMENTFILE_API_URL = '/api/v1/document/getFile?id={id}'
export const ADD_USERDOCUMENT_API_URL = '/api/v1/document/uploadDocImage'
export const DELETE_USERDOCUMENT_API_URL = '/api/v1/document/deleteDocImage?documentId={documentId}'

// Cost to Sponsor
export const GET_CTS_API_URL = '/api/v1/costToSponsor/getCTSAll'
export const GET_CTS_BY_PROFILE_API_URL = '/api/v1/costToSponsor/getCTSByProfile?profileId={profileId}'
export const ADD_CTS_API_URL = '/api/v1/costToSponsor/uploadCTS'
export const DELETE_CTS_API_URL = '/api/v1/costToSponsor/deleteCTS?imageId={imageId}'

export const ADD_CTS_GROUP_API_URL = '/api/v1/costToSponsor/uploadCTSByProfile'
export const GET_CTS_GROUP_API_URL = '/api/v1/costToSponsor/getCTSByProfile?profileId={profileId}'
export const GET_CTS_GROUPALL_API_URL = '/api/v1/costToSponsor/getCTSByProfile'

export const DELETE_CTS_GROUP_API_URL = '/api/v1/costToSponsor/deleteCTSByProfile?profileId={profileId}'
export const UPDATE_PROFILE_PAYMENTSTATUS_API_URL = '/api/v1/profile/updatePaymentStatus'

export const GET_EVENTCATEGORY_BYPROFILE_API_URL = '/api/v1/profile/getEventsCatByProfile?profileId={profileId}'
//export const ADD_EVENTCATEGORY_BYPROFILE_API_URL = '/api/v1/profile/addMultipleEventsCategory'

export const GET_EVENT_API_URL = '/api/v1/events'
export const GET_EVENTCATEGORY_URL = '/api/v1/categoryByEvents?events={events}'
export const ADD_EVENTCATEGORY_BYPROFILE_API_URL = '/api/v1/profile/addEventsCategory'
export const DELETE_EVENTCATEGORY_BYPROFILE_API_URL = '/api/v1/profile/deleteEventsCategory?eventsCategoryId={eventsCategoryId}'

export const GET_EVENTBYUSER_API_URL = '/api/v1/profile/getEventsByProfile?profileId={profileId}'
export const ADD_EVENTBYUSER_API_URL = '/api/v1/profile/addEvents'
export const DELETE_EVENTBYUSER_API_URL = '/api/v1/profile/deleteProfileEvents?profileEventsId={profileEventsId}'

export const GET_PAYMENT_MONITORING_API_URL =
  '/api/v1/payment/findProfileByPaymentStatus?userId={userId}&status={status}&paymentStatus={paymentStatus}&name={name}&island={island}&province={province}'
export const GET_USERPAYMENT_IMAGE_API_URL = '/api/v1/payment/getPaymentImage?paymentId={paymentId}'

export const GET_USERS_EXCEL_API_URL =
  '/api/v1/users/getexcel/?userId={userId}&role={role}&type={type}&status={status}&name={name}&withVisa={withVisa}&withCompanion={withCompanion}'

export const GET_PAYMENT_MONITORING_EXCEL_API_URL =
  '/api/v1/payment/getexcel?userId={userId}&status={status}&paymentStatus={paymentStatus}&name={name}&island={island}&province={province}'
