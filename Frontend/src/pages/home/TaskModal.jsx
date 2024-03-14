import React from 'react';

const TaskModal = ({ showModal, closeModal, task, mode }) => {
    const modalBgColor = mode === 'dark' ? 'bg-gray-800' : 'bg-white';
    const textColor = mode === 'dark' ? 'text-white' : 'text-black';

    return (
        <>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                            onClick={closeModal}
                        >
                            <div className={`absolute inset-0 ${mode === 'dark' ? 'bg-black opacity-50' : 'bg-white opacity-25'}`}></div>
                        </div>
                        <div className={`rounded-lg p-6 my-8 mx-auto max-w-xl shadow-xl transform transition-all w-1/2 ${modalBgColor} ${textColor} min-w-1/2 min-h-1/2`}>
                            <button className={`absolute top-0 right-0 m-4 ${textColor}`} onClick={closeModal}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <h1 className="text-xl font-semibold mb-6 border-b-2 pb-2">{task.title}</h1>
                            <div className="mb-4">
                                <p>{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TaskModal;
