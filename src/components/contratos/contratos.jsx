import React, { useEffect, useState } from "react";
import { loadContratos } from "../../redux/configSlice";
import { useSelector, useDispatch } from 'react-redux';
import { setContratos } from "../../utils/getConfigSheet";
import { Table } from 'antd';

function Contratos() {
    const dispatch = useDispatch();
    const { contratos } = useSelector((state) => state.config.categories);
    const columns = [
        {
            title: 'Área',
            dataIndex: 'area',
        },
        {
            title: 'No. contratos',
            dataIndex: 'contratosCount',
        }
    ];

    useEffect(() => {
        if (contratos && !contratos.subLevel) {
            setContratos(contratos.gid).then((data) => {
                dispatch(loadContratos(data));
            }
            );
        }
    }, [contratos, dispatch]);

    const dataSource = contratos && contratos.subLevel ? Object.entries(contratos.subLevel).map(([key, value]) => (
        {
            key: key,
            area: value.areaName,
            contratosCount: 0
        }
    )) : []


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
        selections: [
            Table.SELECTION_ALL,
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE,
            {
                key: 'odd',
                text: 'Select Odd Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return false;
                        }
                        return true;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
            {
                key: 'even',
                text: 'Select Even Row',
                onSelect: (changeableRowKeys) => {
                    let newSelectedRowKeys = [];
                    newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
                        if (index % 2 !== 0) {
                            return true;
                        }
                        return false;
                    });
                    setSelectedRowKeys(newSelectedRowKeys);
                },
            },
        ],
    };
    return (
        <main className="main-standard">
            <section className="section-standard">
                {contratos && contratos.subLevel &&
                    <div>
                        <h1>{contratos.categoryName}</h1>
                        <div>
                            <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} />
                        </div>
                    </div>
                }
            </section>
        </main>
    );
}

export default Contratos;
