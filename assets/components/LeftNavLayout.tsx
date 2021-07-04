import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Link from "antd/lib/typography/Link";
import React, { useContext } from "react";
import { AppContext } from "../AppContainer";

export const LeftNavLayout = () => {
    const { user } = useContext(AppContext);
    return (
        <Layout>
            <Layout.Sider className="left-nav">
                <div className="left-nav-title-container">
                    <h2 className="left-nav-title-text">
                        Benfeld
                    </h2>
                </div>
                {user && (
                    <div className="left-nav-title-text">
                        Bonjour, {user.firstName.toUpperCase()}
                    </div>
                )}
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['/dashboard']}>
                    <Menu.Item key={"manage-user"}> Utilisateur <Link href={"/gestion-utilisateurs"} /> </Menu.Item>
                    <Menu.Item key={"manage-user"}> Gérer l'app <Link href={"/gerer-app"} /> </Menu.Item>
                    <Menu.Item key={"manage-user"}> Mon profil <Link href={"/profil"} /> </Menu.Item>
                    <Menu.Item key='/logout'> <span><LogoutOutlined className="mr-1" rotate={270} style={{ color: "red" }} />Déconnexion</span> </Menu.Item>
                    <Menu.Divider />
                </Menu>
            </Layout.Sider>
        </Layout>
    );
};
export default LeftNavLayout;