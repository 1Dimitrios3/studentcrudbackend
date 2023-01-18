import { Drawer, Button } from 'antd';
import StudentForm from './StudentForm';
import { Student } from './types';

type DrawerTypes<T> = {
    title: string;
    showDrawer: boolean;
    setShowDrawer: (status: boolean) => void
    fetchData: () => void,
    selectedEntity?: T
}

function DrawerForm<T>({
        showDrawer,
        setShowDrawer,
        title,
        fetchData,
        selectedEntity
    }: DrawerTypes<T>) {
    const onClose = () => setShowDrawer(false);

    return <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={showDrawer}
        bodyStyle={{paddingBottom: 80}}
        footer={
            <div
                style={{
                    textAlign: 'right',
                }}
            >
                <Button
                    onClick={onClose}
                    style={{marginRight: 8}}>
                    Cancel
                </Button>
            </div>
        }
    >
       <StudentForm
         onClose={onClose}
         fetchStudents={fetchData}
         selectedStudent={selectedEntity as Student}
       />
    </Drawer>
}

export default DrawerForm;