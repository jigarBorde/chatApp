import {
    MultiChatWindow,
    MultiChatSocket,
    useMultiChatLogic,
} from 'react-chat-engine-advanced';
const ChatsPage = (props) => {
    console.log(props.user)
    const chatProps = useMultiChatLogic(import.meta.env.VITE_Project_id, props.user.username, props.user.secret);
    return (
        <div style={{ height: "100vh" }}>
            <MultiChatSocket {...chatProps} />
            <MultiChatWindow {...chatProps} style={{ height: '100vh' }} />
        </div>
    )
};
export default ChatsPage;