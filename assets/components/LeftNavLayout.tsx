import { LogoutOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "antd/lib/typography/Link";
import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import { AppContext } from "../AppContainer";

export const LeftNavLayout = () => {
    const { user } = useContext(AppContext);
    const history = useHistory();

    const onLogout = () => {
        localStorage.clear()
        location.reload()
    }
    return (
        <Layout>
            <Layout.Sider className="left-nav">
                {location.pathname !== "/" &&
                    <div className="left-nav-title-container">
                        <h2 onClick={() => history.push('/')} className="left-nav-title-text-header">
                            <MenuFoldOutlined /> Aller à l'agenda
                        </h2>
                    </div>
                }
                {user && (
                    <div className="left-nav-title-text">
                        Bonjour, {user.firstName}
                    </div>
                )}
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['/dashboard']}>
                    <Menu.Item onClick={() => (console.log("toto"))} key={"manage-user"}> Utilisateurs <Link href={"/gestion-utilisateurs"} /> </Menu.Item>
                    <Menu.Item key={"manage-booking"}> Gérer réservations <Link href={"/gestion-reservations"} /> </Menu.Item>
                    <Menu.Item key={"manage-app"}> Gérer l'app <Link href={"/gerer-app"} /> </Menu.Item>
                    <Menu.Item key={"profil"}> Mon profil <Link href={"/profil"} /> </Menu.Item>
                    <Menu.Item onClick={() => onLogout()} key='/logout'> <span><LogoutOutlined className="mr-1" rotate={270} style={{ color: "red" }} />Déconnexion</span> </Menu.Item>
                    <Menu.Divider />
                </Menu>
            </Layout.Sider>
        </Layout>
    );
};
export default LeftNavLayout;