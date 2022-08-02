import { Toaster } from 'react-hot-toast';
export default function ManageAsset(){
    return (<><h1>Manage Asset</h1>
    <Toaster
                toastOptions={{
                    className: 'toast',
                    style: {
                        border: '1px solid #713200',
                        padding: '36px',
                        color: '#713200',
                        
                    },
                }}
            />
            </>);
}