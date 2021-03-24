import React from "react";
import { logoIcon, logoSm, logoDark } from "../../utils/images";
import { NavigatorPropsType } from "./interfaces/navigator_props_type";
import { connect } from "react-redux";
import { ANALYTICS_ROUTE, TRADERS_ROUTE, USER_LOGS_ROUTE, MANAGEMENT_ROUTE } from "../../utils/route_const";
import { useRouter } from "next/router";
import { logout } from "../../redux/actions/AuthActions";
import { USER_TYPE } from "../../utils/app_const";

const USER_TYPE_PREFIX_MAP = {
    [USER_TYPE.SUPER_ADMIN]: 'SA',
    [USER_TYPE.COMPLIANCE_ANALYST]: 'CA',
    [USER_TYPE.COMPLIANCE_MANAGER]: 'CM'
}

export const NavigatorWrapper = (props: NavigatorPropsType) => {
  const { dispatch, authData } = props

  const router = useRouter()
  return <div className="navigation mr-1">
    <div id="logo" className='pt-4'>
      <a >
        <img className="logo" src={logoIcon} alt="logo" />
        <img className="logo-sm" src={logoSm} alt="small logo" />
        <img className="logo-dark" src={logoDark} alt="dark logo" />
      </a>
    </div>
    <header className="navigation-header pt-4">
      <figure className="avatar r-gr">
        <h6>{USER_TYPE_PREFIX_MAP[authData.userType]}</h6>
        {/*<img src="assets/media/image/user/man_avatar3.jpg" className="rounded-circle" alt="image" />*/}
      </figure>
      {/*<div>
        <p style={{ marginBottom: 0, fontSize: 12, color: "#fff" }}>{authData && authData.user ? authData.user.name.splice(-6) : ""}</p>
        <p className="text-muted" style={{ marginBottom: 0, fontSize: 12, color: "#fff", lineHeight: 2 }}>14:15:02</p>
      </div>*/}
    </header>

      <div className="navigation-menu-body pt-4">
        <ul>
          {
            [USER_TYPE.SUPER_ADMIN, USER_TYPE.COMPLIANCE_MANAGER].includes(authData.userType)
            ? <li className={`${router.pathname == ANALYTICS_ROUTE ? "open" : ""}`} onClick={() => router.push(ANALYTICS_ROUTE)}>
                <a title="Dashboard">
                  <i className="nav-link-icon demo-icon icon-insert_chart_24px"></i>
                </a>
              </li>
            : null
          }
            <li className={`${router.pathname === TRADERS_ROUTE ? "open" : ""}`} onClick={() => router.push(TRADERS_ROUTE)}>
              <a title="Monitoring and Compliance ">
                <i className="nav-link-icon demo-icon icon-change_history_24px"></i>
              </a>
            </li>
            {
              [USER_TYPE.SUPER_ADMIN, USER_TYPE.COMPLIANCE_MANAGER].includes(authData.userType)
                ? <li className={`${router.pathname === MANAGEMENT_ROUTE ? "open" : ""}`}>
                    <a title="Org and User Management" href={MANAGEMENT_ROUTE}>
                      <svg width="22" height="22" viewBox="0 0 71 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M57.5605 30.9042C64.8372 24.3625 65.4331 13.1606 58.8914 5.88397C52.8916 -0.789919 42.8492 -1.9237 35.5126 3.24466C27.5147 -2.39974 16.4556 -0.491875 10.8112 7.50583C5.63198 14.8444 6.76116 24.8973 13.4394 30.904C5.14153 35.2781 -0.0373865 43.9016 0.00020325 53.2815V60.8886C0.00020325 62.2891 1.13547 63.4244 2.53595 63.4244H68.4641C69.8645 63.4244 70.9998 62.2891 70.9998 60.8886V53.2815C71.0372 43.9016 65.8583 35.2781 57.5605 30.9042ZM45.6426 5.10335C52.6349 5.09563 58.3096 10.7577 58.3175 17.75C58.323 22.7368 55.4008 27.2623 50.8535 29.3091C50.6583 29.3978 50.463 29.4789 50.2653 29.5627C49.6395 29.8151 48.994 30.016 48.3356 30.1637C48.2088 30.1916 48.0819 30.2068 47.9527 30.2322C47.2169 30.3732 46.4703 30.4486 45.7212 30.4579C45.384 30.4579 45.0442 30.4325 44.7069 30.4021C44.5802 30.4021 44.4533 30.4021 44.3265 30.3767C42.8853 30.2071 41.4834 29.7939 40.1807 29.1546C40.1325 29.1317 40.0767 29.1342 40.0285 29.114C39.7749 28.9923 39.5214 28.8858 39.2957 28.7488C39.3161 28.7234 39.3287 28.6956 39.3489 28.6702C40.5117 27.1761 41.4284 25.5061 42.0646 23.7231L42.1432 23.51C42.4325 22.6584 42.6571 21.7862 42.8152 20.9007C42.8381 20.7714 42.8558 20.6471 42.8761 20.5077C43.0228 19.6063 43.0999 18.6951 43.1069 17.7818C43.0996 16.8703 43.0225 15.9607 42.8761 15.0609C42.8558 14.9291 42.8381 14.8073 42.8152 14.6679C42.6571 13.7826 42.4325 12.9103 42.1432 12.0586L42.0646 11.8456C41.4284 10.0625 40.5115 8.39253 39.3489 6.89845C39.3286 6.87304 39.316 6.84526 39.2957 6.81985C41.2222 5.69602 43.4123 5.1035 45.6426 5.10335ZM12.6786 17.7819C12.6607 10.798 18.3076 5.12177 25.2916 5.1038C28.5653 5.09533 31.7148 6.35689 34.0775 8.62297C34.2246 8.76501 34.3691 8.9069 34.511 9.05399C34.9465 9.51027 35.3481 9.9976 35.713 10.512C35.8246 10.6692 35.926 10.8366 36.0299 10.9989C36.3843 11.5443 36.6954 12.1166 36.9604 12.7104C37.0239 12.855 37.072 13.0021 37.1277 13.1465C37.395 13.8034 37.6054 14.4821 37.7567 15.175C37.7745 15.2511 37.7795 15.3272 37.7947 15.4058C38.1159 16.9802 38.1159 18.6034 37.7947 20.1779C37.7795 20.2565 37.7743 20.3325 37.7567 20.4086C37.6055 21.1016 37.3952 21.7803 37.1277 22.4371C37.072 22.5817 37.0237 22.7288 36.9604 22.8732C36.6951 23.4662 36.384 24.0376 36.0299 24.5823C35.9259 24.7445 35.8246 24.912 35.713 25.0692C35.3482 25.5837 34.9465 26.0709 34.511 26.5271C34.369 26.6742 34.2244 26.8163 34.0775 26.9582C33.0508 27.9365 31.8671 28.7354 30.5757 29.3214C30.3703 29.4152 30.1623 29.5015 29.9519 29.575C29.3407 29.8176 28.7118 30.0126 28.0705 30.1582C27.9108 30.1937 27.7459 30.2139 27.5836 30.2418C26.8951 30.3701 26.197 30.4403 25.4967 30.4524H25.2179C24.5176 30.4405 23.8195 30.3701 23.131 30.2418C22.9687 30.2139 22.8038 30.1937 22.6441 30.1582C22.0028 30.0126 21.3738 29.8176 20.7627 29.575C20.5521 29.4914 20.3443 29.4052 20.1389 29.3214C15.6023 27.2731 12.6844 22.7594 12.6786 17.7819ZM45.6426 58.353H5.07155V53.2817C5.03441 44.6891 10.4482 37.0173 18.5563 34.1727C22.909 35.9849 27.805 35.9849 32.1579 34.1727C33.0044 34.482 33.8295 34.8471 34.6276 35.2656C35.1551 35.5369 35.642 35.8463 36.1491 36.1581C36.4787 36.3635 36.8133 36.5639 37.1304 36.7896C37.6198 37.1369 38.0813 37.5148 38.5352 37.9027C38.8268 38.1563 39.1158 38.4098 39.3896 38.6634C39.808 39.0589 40.201 39.4773 40.5788 39.906C40.8501 40.2153 41.1139 40.5297 41.365 40.8543C41.6972 41.2803 42.0141 41.7165 42.3083 42.1652C42.5619 42.5456 42.7876 42.9411 43.0106 43.3367C43.2642 43.7728 43.4975 44.209 43.7104 44.6629C43.9234 45.1168 44.1111 45.6138 44.2936 46.0982C44.4533 46.5191 44.6232 46.9375 44.755 47.366C44.9326 47.9542 45.0568 48.5627 45.181 49.1713C45.2571 49.5313 45.356 49.8839 45.4117 50.2489C45.5619 51.2529 45.6391 52.2665 45.6425 53.2817V58.353H45.6426ZM65.9283 58.353H50.7141V53.2817C50.7141 52.488 50.6685 51.7019 50.5975 50.9235C50.5771 50.6953 50.5418 50.4696 50.5164 50.2414C50.4479 49.6809 50.3693 49.1257 50.2627 48.5754C50.2171 48.3405 50.169 48.1045 50.1182 47.8679C49.9965 47.3033 49.8553 46.7437 49.6947 46.1892C49.6415 46.0066 49.5933 45.8215 49.5375 45.6416C48.8275 43.3718 47.7986 41.2145 46.4821 39.234L46.3831 39.0894C45.9471 38.4419 45.4813 37.8156 44.9859 37.2105L44.9682 37.1876C44.4611 36.5588 43.9108 35.9476 43.3327 35.3695C43.3657 35.3695 43.4012 35.3695 43.4367 35.3695C44.1523 35.4635 44.8728 35.5144 45.5946 35.5216H45.7341C46.4021 35.5158 47.0691 35.4726 47.7323 35.3924C47.9402 35.367 48.1457 35.3289 48.3535 35.2959C48.8929 35.2132 49.4254 35.1058 49.951 34.974C50.1006 34.9359 50.2528 34.9004 50.4049 34.8573C51.0948 34.6697 51.7723 34.4393 52.4334 34.1677C60.5475 37.0095 65.9662 44.6846 65.9285 53.2818V58.353H65.9283Z" fill="white"/>
</svg>
                    </a>
                </li>
                : null
            }
            {
              [USER_TYPE.SUPER_ADMIN, USER_TYPE.COMPLIANCE_MANAGER].includes(authData.userType)
                ? <li className={`${router.pathname === USER_LOGS_ROUTE ? "open" : ""}`}>
                  <a title="User Logs" href={USER_LOGS_ROUTE}>
                    <i className="nav-link-icon demo-icon icon-notes_24px"></i>
                  </a>
                </li>
                : null
            }
            <li>
              <a onClick={() => {
                dispatch(logout())
              }} title="Logout">
                <i className="nav-link-icon demo-icon icon-keyboard_tab_24px"></i>
              </a>
            </li>
        </ul>
      </div>
    </div>
};

export const Navigator =  connect(state => ({
    authData: state.auth.authData,
}))(NavigatorWrapper);

