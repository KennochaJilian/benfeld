import React, { useEffect, useState } from "react";
import Room from "../classes/Room";
import Sport from "../classes/Sport";
import { DeleteButton } from "../components/GenericButton";
import { notificationType, openNotificationWithIcon } from "../components/generics/Notification";
import { PageContent } from "../components/generics/PageContent";
import { ManageAppModals } from "../components/ManageAppModals";
import "../css/manageApp.less";
import { RoomApiService } from "../services/RoomApiService";
import { SportApiService } from "../services/SportApiService";

export const ManageApp = () => {
    const [sports, setSports] = useState<Sport[]>();
    const [rooms, setRooms] = useState<Room[]>();
    const [dataToManage, setDataToManage] = useState<string>();
    const sportApiService = new SportApiService();
    const roomApiService = new RoomApiService();

    const loadData = () => {
        sportApiService.list().then(response => setSports(response))
        roomApiService.list().then(response => setRooms(response))
    }

    useEffect(() => {
        loadData();
    }, [])

    const onSuccessDeleted = (data) => {
        openNotificationWithIcon(notificationType.success, `${data} supprimé`, `Vous avez bien supprimé ${data}`)
        setDataToManage(null)
        loadData()
    }

    const deleteData = (dataId, typeData) => {
        if (typeData == "sport") {
            sportApiService.delete(dataId).then(response => {
                onSuccessDeleted('sport')
            })
            return
        }
        roomApiService.delete(dataId).then(response => {
            onSuccessDeleted('salle')
        })

    }

    const generateList = (dataSource, typeData) => {
        return <ul>
            {dataSource.map(data =>
                <li><span className="data-name"> {data.name} </span>
                    {typeData == "sport" &&
                        <DeleteButton title="Supprimer" onConfirm={() => deleteData(data.id, typeData)} />
                    }
                </li>
            )}
        </ul>
    }

    return (
        <PageContent title="Autres options" returnBouton={true} history={history}>
            <div id="manage-app-container">
                <div className="container-manage-app">
                    <div className="btn-manage-app">
                        <span className="title">Sports </span> <span className="add-data" onClick={() => setDataToManage("sport")}>+</span></div>
                    <div className="list-data">
                        {sports && generateList(sports, "sport")}
                    </div>
                </div>
                <div className="container-manage-app">
                    <div className="btn-manage-app">
                        <span className="title"> Salles </span>
                        <span className="add-data" onClick={() => setDataToManage("room")}>+</span>
                    </div>
                    <div className="list-data">
                        {rooms && generateList(rooms, "salle")}
                    </div>
                </div>
                <ManageAppModals loadData={loadData} dataToManage={dataToManage} setDataToManage={setDataToManage} />
            </div>
        </PageContent>

    )
}