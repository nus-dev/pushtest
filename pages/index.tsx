import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import PushContext from '../src/context/PushContext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const ReactHookFormDemo = () => {
    const defaultValues = {
        authToken: '',
        title: '',
        body: '',
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({ defaultValues });

    const { pushes, sendPushAsync, ready } = useContext(PushContext);

    const onSubmit = (data: typeof defaultValues) => {
        sendPushAsync(data);
    };

    const getFormErrorMessage = (name: keyof typeof defaultValues) => {
        return (
            errors[name] && (
                <small className="p-error">{errors[name]?.message}</small>
            )
        );
    };

    return (
        <>
            <button onClick={ready}>Ready</button>
            <div className="form-demo">
                <div className="flex justify-content-center">
                    <div className="card">
                        <h5 className="text-center">Send Push Form</h5>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="p-fluid"
                        >
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller
                                        name="authToken"
                                        control={control}
                                        rules={{
                                            required: 'AuthToken is required.',
                                        }}
                                        render={({ field, fieldState }) => (
                                            <InputText
                                                id={'authToken'}
                                                {...field}
                                                autoFocus
                                                className={classNames({
                                                    'p-invalid':
                                                        fieldState.error,
                                                })}
                                            />
                                        )}
                                    />
                                    <label
                                        htmlFor="authToken"
                                        className={classNames({
                                            'p-error': errors.authToken,
                                        })}
                                    >
                                        AuthToken*
                                    </label>
                                </span>
                                {getFormErrorMessage('authToken')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller
                                        name="title"
                                        control={control}
                                        rules={{
                                            required: 'Title is required.',
                                        }}
                                        render={({ field, fieldState }) => (
                                            <InputText
                                                id={'title'}
                                                {...field}
                                                autoFocus
                                                className={classNames({
                                                    'p-invalid':
                                                        fieldState.error,
                                                })}
                                            />
                                        )}
                                    />
                                    <label
                                        htmlFor="title"
                                        className={classNames({
                                            'p-error': errors.title,
                                        })}
                                    >
                                        Title*
                                    </label>
                                </span>
                                {getFormErrorMessage('title')}
                            </div>
                            <div className="field">
                                <span className="p-float-label">
                                    <Controller
                                        name="body"
                                        control={control}
                                        rules={{
                                            required: 'Body is required.',
                                        }}
                                        render={({ field, fieldState }) => (
                                            <InputText
                                                id={'body'}
                                                {...field}
                                                autoFocus
                                                className={classNames({
                                                    'p-invalid':
                                                        fieldState.error,
                                                })}
                                            />
                                        )}
                                    />
                                    <label
                                        htmlFor="body"
                                        className={classNames({
                                            'p-error': errors.body,
                                        })}
                                    >
                                        Body*
                                    </label>
                                </span>
                                {getFormErrorMessage('body')}
                            </div>
                            <Button
                                type="submit"
                                label="Send Push"
                                className="mt-2"
                            />
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <div className="card">
                    <DataTable
                        value={pushes}
                        showGridlines
                        responsiveLayout="scroll"
                    >
                        <Column field="title" header="Title"></Column>
                        <Column field="body" header="Body"></Column>
                    </DataTable>
                </div>
            </div>
        </>
    );
};

export default ReactHookFormDemo;
