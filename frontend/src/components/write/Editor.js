import React, {useRef, useEffect} from "react";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Responsive from "../common/Responsive";

const StyledEditor = styled(Responsive)`
    padding: 5rem 0;
`;

const TitleInput = styled.input`
    font-size: 3rem;
    outline: none;
    padding-bottom: 0.5rem;
    border: none;
    border-bottom: 1px solid ${palette.gray[4]};
    margin-bottom: 2rem;
    width: 100%;
`;

const LevelTimeBlock = styled.div`
    p {
        margin: 0;
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
        font-weight: bold;
    }
`;

const QuillWrapper = styled.div`
    /* 에디터 최소 크기 지정 및 padding 제거 */
    .qu-editor {
        padding: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor.ql-blank:before {
        left: 0px;
    }
`;

const Editor = ({title, body, level, time, onChangeField}) => {
    const quillElement = useRef(null); // Quill을 적용할 DivElement를 설정
    const quillIstance = useRef(null); // Quill 인스턴스를 설정

    useEffect(() => {
        quillIstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '내용을 작성하세요!',
            modules: {
                // https://quilljs.com/docs/modules/toolbar/ 참고하기
                toolbar: [
                    [{header: '1'}, {header: '2'}],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{list: 'ordered'}, {list: 'bullet'}],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });

        // quill에 text-change 이벤트 핸들러 등록
        // 참고: https://quilljs.com/docs/api/#event
        const quill = quillIstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if (source === 'user') {
                onChangeField({key: 'body', value: quill.root.innerHTML});
            }
        })
    }, [onChangeField]);

    const mounted = useRef(false);
    useEffect(() => {
        if (mounted.current) return;
        mounted.current = true;
        quillIstance.current.root.innerHTML = body;
    }, [body]);

    const onChangeTitle = e => {
       onChangeField({key: 'title', value: e.target.value});
    };

    return (
        <StyledEditor>
            <TitleInput
                value={title}
                onChange={onChangeTitle}
                placeholder={"제목을 입력하세요!"}
            />
            <LevelTimeBlock>
                <p>
                    난이도: {level}
                </p>
                <p>
                    클리어 타임: {time}
                </p>
            </LevelTimeBlock>
            <QuillWrapper>
                <div ref={quillElement}/>
            </QuillWrapper>
        </StyledEditor>
    )
};

export default React.memo(Editor);
