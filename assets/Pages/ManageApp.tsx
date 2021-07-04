import { Button } from "antd";
import React, { useEffect, useState } from "react";
import Room from "../classes/Room";
import Sport from "../classes/Sport";
import { DeleteButton } from "../components/GenericButton";
import { notificationType, openNotificationWithIcon } from "../components/generics/Notification";
import { PageContent } from "../components/generics/PageContent";
import { ManageAppModals } from "../components/ManageAppModals";
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

    const deleteData = (dataId, typeData) =>{
        if (typeData == "sport"){
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
                <React.Fragment>
                    <li>{data.name}</li>
                    <DeleteButton title="Supprimer" onConfirm = {() => deleteData(data.id, typeData) }/>
                </React.Fragment> )}
        </ul>
    }

    return (
        <PageContent title="Gérer les informations de réservations" returnBouton={true} history={history}>
            <Button onClick={() => setDataToManage("sport")}> Ajouter un sport</Button>
            {sports && generateList(sports, "sport")}
            <Button onClick={() => setDataToManage("room")}> Ajouter une salle </Button>
            {rooms && generateList(rooms, "salle")}
            <ManageAppModals loadData={loadData} dataToManage={dataToManage} setDataToManage={setDataToManage} />
        </PageContent>

    )
}