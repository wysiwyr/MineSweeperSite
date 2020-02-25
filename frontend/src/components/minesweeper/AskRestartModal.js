import React from "react";
import AskModal from "../common/AskModal";

const AskRestartModal = ({visible, finishText, description, clear, onConfirm, onCancel}) => {
    return (
        <AskModal
            visible={visible}
            title={finishText}
            description={description}
            confirmText={finishText}
            clear={clear}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    )
};

export default AskRestartModal;
