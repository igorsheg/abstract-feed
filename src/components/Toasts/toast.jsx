import React from "react";

class Toast extends React.Component {
    static getDerivedStateFromProps(nextProps) {
        if (nextProps.hovering) {
            return { hovering: true };
        } else {
            return { hovering: false };
        }
    }

    state = {
        visible: false,
        hiding: false
    };

    componentDidMount = () => {
        setTimeout(() => this.setState({ visible: true }), 10);

        if (!this.props.action && !this.props.preserve) {
            this.hider = setTimeout(this.hide, 3500);
        }
    };

    componentWillUnmount = () => {
        clearTimeout(this.hider);
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.shouldHide) {
            return (this.hider = setTimeout(this.hide, 300));
        }
        if (this.props.preserve) return;

        if (this.state.hovering) {
            clearTimeout(this.hider);
        } else if (prevState.hovering && !this.state.hovering) {
            this.hider = setTimeout(this.hide, 3500);
        }
    };

    hide = () => {
        this.setState({ hiding: true }, () => {
            setTimeout(() => {
                this.props.remove();
            }, 200);
        });
    };

    render() {
        const {
            text,
            action,
            onAction,
            cancelAction,
            onCancelAction,
            type,
            index: arrayIndex,
            length,
            dark
        } = this.props;
        const { visible, hiding } = this.state;

        const index = length - arrayIndex - 1;

        return (
            <div
                index={index}
                length={length}
                className={`toast-container ${visible ? "visible" : ""} ${hiding ? "hiding" : ""}`}
            >
                <div className={`toast ${type ? type : ""}`}>
                    <span className="message">{text}</span>
                    {onCancelAction && (
                        <button
                            onClick={() => {
                                if (onCancelAction) {
                                    onCancelAction();
                                }
                                this.hide();
                            }}
                            style={{ marginRight: 10 }}
                            type={type}
                            small
                        >
                            {cancelAction || "Cancel"}
                        </button>
                    )}
                    {action && (
                        <button
                            onClick={() => {
                                if (onAction) {
                                    onAction();
                                }
                                this.hide();
                            }}
                            darkBg={type === "error" || type === "dark" || dark}
                            highlight={type === "success"}
                            warning={type === "error"}
                            small
                        >
                            {action}
                        </button>
                    )}
                </div>
                <style jsx>
                    {`
                        .toast-container {
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                                Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                                "Segoe UI Symbol";
                            width: 420px;
                            height: 72px;
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            transition: all 0.68s cubic-bezier(0.19, 1, 0.22, 1);
                            transform: translate3d(0, 100%, 0px) scale(1);
                            animation: show 0.68s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                            opacity: 1;
                            ${index > 2 ? "opacity: 0; pointer-events: none;" : ""};
                        }

                        .toast-container.visible {
                            transform: translate3d(0, -${index * 15}px, -${index}px)
                                scale(${1 - (index / 100) * 5});
                        }

                        .toast-container.hiding {
                            opacity: 0;
                        }

                        .toast {
                            background: white;
                            color: #111;
                            border: 0;
                            border-radius: 4px;
                            height: 60px;
                            align-items: center;
                            justify-content: space-between;
                            padding: 0 20px;
                            border: 1px solid #eaeaea;
                            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
                            font-size: 14px;
                            line-height: 18px;
                            display: flex;
                        }

                        .toast.error {
                            border: 0;
                            background-color: #e00;
                            color: #ffffff;
                        }

                        .toast.success {
                            border: 0;
                            background-color: #0070f3;
                            color: #ffffff;
                        }

                        :global(.toast-area:hover) .toast-container {
                            transform: translate3d(0, ${index * -70}px, -${index}px)
                                scale(${length === 1 ? 1 : 0.98205});
                        }

                        .message {
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            width: ${action ? 70 : 100}%;
                            overflow: hidden;
                            margin-top: -1px;
                        }

                        @media (max-width: 440px) {
                            .toast-container,
                            .toast {
                                width: 90vw;
                            }

                            .toast-container {
                                ${index > 1 ? "opacity: 0; pointer-events: none;" : ""};
                            }
                        }
                    `}
                </style>
            </div>
        );
    }
}

export default Toast;
