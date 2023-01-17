// import { DownOutlined } from "@ant-design/icons";
// import { PageHeader } from "@ant-design/pro-layout";
// import { Link, useLocation, useRouter } from "@tanstack/react-location";
// import { Affix, Button, Dropdown, Menu, MenuProps } from "antd";
// import { capitalize } from "lodash-es";

// import { LocationGenerics } from "router";
// import { headerLinks } from "./links";

import "./header.scss";
// import { useState } from "react";

// function DropDownMenuList({ link }) {
//   const { children } = link;

//   if (!(children && children.length)) return null;

//   return (
//     <Menu className="dropwdownmenu">
//       {children.map((childLink, index) => (
//         <Menu.Item key={index}>
//           <Link to={`${link.path}/${childLink.path}`}>{childLink.text}</Link>
//         </Menu.Item>
//       ))}
//     </Menu>
//   );
// }

// function getRootPath(path) {
//   const paths = path.split("/");

//   return paths[1] ? `/${paths[1]}` : "";
// }

// function getActiveLinkClass(pathname, path) {
//   return getRootPath(pathname).match(new RegExp(path)) ? "activenavlink" : "";
// }

// function RenderMenuLabel({ link }) {
//   return link.useIcon ? (
//     <link.Icon className={link.classes || ""} />
//   ) : (
//     link.text
//   );
// }

// {/* {headerLinks.map((link) => (
//     <Menu.Item key={link.path}>
//       <Link to={link.path}>{link.name}</Link>
//     </Menu.Item>
//   ))} */}
// {/* <Menu.Item className="user-menu">
//     <Dropdown menu={userMenu}>
//       <Avatar size={40} icon="user" />
//     </Dropdown>
//   </Menu.Item>
// </Menu> */}
// <PageHeader
//   title={capitalize(location.current.pathname.replace(/\//g, ""))}
//   extra={headerLinks.map((link, index) => {
//     // const activeClass = getActiveLinkClass(location.pathname, link.path);
//     const hasChildren = Array.isArray(link.children);

//     return (
//       <Dropdown
//         placement="bottomCenter"
//         menu={{
//           items: headerLinks.map((link, index) => ({
//             key: index,
//             label: link.text,
//             icon: <link.Icon />,
//             onClick: ({ key, keyPath }) => {
//               console.log("key => ", key);
//               console.log("keyPath => ", keyPath);
//             },
//           })),
//         }}
//         key={index}
//         className="navdropdown"
//       >
//         <Button
//           // className={`${activeClass} ${link.classes || ""}`}
//           type="link"
//           // href={hasChildren && link.path}
//         >
//           {!hasChildren ? (
//             <RenderMenuLabel link={link} />
//           ) : (
//             <div className="with-caret">
//               <RenderMenuLabel link={link} />
//               <DownOutlined className="caret" />
//             </div>
//           )}
//         </Button>
//       </Dropdown>
//     );
//   })}
//   className="apppageheader"
// />
// );
// };

// export default AppHeader;
