import { Card } from "react-bootstrap";

export const UserInfo = ({ name, email }) => {
    return (
        <Card className="mb-4">
            <Card.Header>
                <Card.Title>User Information</Card.Title>
            </Card.Header>
            <Card.Body>
                <Card.Text
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <strong>Name:</strong> {name}
                </Card.Text>
                <Card.Text>
                    <strong>Email:</strong> {email}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};
