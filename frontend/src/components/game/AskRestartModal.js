import React from "react";
import AskModal from "../common/AskModal";

const AskRestartModal = ({visible, finishText, description, onConfirm, onCancel}) => {
    return (
        <AskModal
            visible={visible}
            title={finishText}
            description={description}
            confirmText={finishText}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    )
};

export default AskRestartModal;
