export default function DeleteAsset(){
    const [modalConfirmDelete, setModalConfirmDelete] = useState({
        isOpen: false,
        isLoading: false,
    });
    const config = {
        headers: { Authorization: `Bearer ${loginState.token}` }
    };
    
    const [modalCannotDelete, setModalCannotDelete] = useState(false);
    let id = 0;
    let assetName='';
    const handleDelete = ()=>{
        console.log(id);
        axios.delete(`https://asset-assignment-be.azurewebsites.net/api/asset/`+id, config)
            .then(
           (response) => {
            setModalConfirmDelete({ ...modalConfirmDelete, isOpen: false })
            toast.success("Delete "+assetName+" asset successfully");
            window.location.reload();
            }).catch((error) => {
                console.log(error)
                setModalConfirmDelete({ ...modalConfirmDelete, isOpen: false })
                setModalCannotDelete({...modalCannotDelete, isOpen: true})
            })
        }
    
    return (<>
        <Modal
        className = "modalConfirm"
                title="Are you sure?"
                visible={modalConfirmDelete.isOpen}
                width={400}
                closable={false}
                onOk={handleDisable}
                onCancel = {()=> {setModalConfirmDelete({ ...modalConfirmDelete, isOpen: false })}}
                footer={[
                    <Button key="submit" className="buttonSave" onClick={handleDelete}>
                     Delete
                    </Button>,
                    <Button key="cancel" className = "buttonCancel" onClick={()=> {setModalConfirmDelete({ ...modalConfirmDelete, isOpen: false })}}>
                      Cancel
                    </Button>
                  ]}
                
            >
                <p>Do you want to delete this asset?</p>
                <br/>
            </Modal>
            <Modal
                className="modalInformation"
                title="Cannot delete asset"
                visible={modalCannotDelete.isOpen}
                width={400}
                closable={true}
                onCancel={() => {
                    setModalCannotDelete({...modalCannotDelete, isOpen: false});
                }}
                footer={[]}
            >
                <p>Cannot delete the asset because it belongs to one or more historical assignments.
If the asset is not able to be used anymore, please update its state in <Button type="link" onClick={navigate("/editasset/"+id)}><u>Edit Asset page</u></Button></p>
                <br/>
            </Modal>
        </>);
}
