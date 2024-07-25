import React, { useState } from "react";
import styled from "styled-components";

interface OverlayProps {
    htmlCode: string;
    cssCode: string;
    isOverlayVisible: boolean;
    setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const OverlayWrapper = styled.div<{ $isVisible: boolean }>`
  display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;

const OverlayContent = styled.div`
  background: white;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const CodeContainer = styled.div`
  display: flex;
  flex-grow: 1;
`;

const CodeSection = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
`;

const CodeTitle = styled.h3`
  margin: 0 0 1rem 0;
`;

const CodeArea = styled.textarea`
  flex-grow: 1;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: monospace;
  font-size: 1rem;
  resize: none; /* Prevent resizing */
`;

const CopyButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border: 1px solid black;
  width: 20%;
  margin: 24px 0 0 auto;
`;

const Overlay = ({ htmlCode, cssCode, isOverlayVisible, setIsOverlayVisible }: OverlayProps) => {
    const [htmlButtonText, setHtmlButtonText] = useState<string>('Copy HTML');
    const [cssButtonText, setCssButtonText] = useState<string>('Copy CSS');

    const copyToClipboard = (text: string, setText: React.Dispatch<React.SetStateAction<string>>, originalText: string) => {
        navigator.clipboard.writeText(text);
        setText('Copied!');
        setTimeout(() => {
            setText(originalText);
        }, 3000);
    };

    return (
        <OverlayWrapper $isVisible={isOverlayVisible}>
            <OverlayContent>
                <CloseButton onClick={() => setIsOverlayVisible(false)}>×</CloseButton>
                <CodeContainer>
                    <CodeSection>
                        <CodeTitle>HTML Code</CodeTitle>
                        <CodeArea value={htmlCode} readOnly />
                        <CopyButton onClick={() => copyToClipboard(htmlCode, setHtmlButtonText, 'Copy HTML')}>{htmlButtonText}</CopyButton>
                    </CodeSection>
                    <CodeSection>
                        <CodeTitle>CSS Code</CodeTitle>
                        <CodeArea value={cssCode} readOnly />
                        <CopyButton onClick={() => copyToClipboard(cssCode, setCssButtonText, 'Copy CSS')}>{cssButtonText}</CopyButton>
                    </CodeSection>
                </CodeContainer>
            </OverlayContent>
        </OverlayWrapper>
    );
}

export default Overlay;
