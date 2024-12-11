
erDiagram
    USERS {
        id SERIAL PK
        name VARCHAR(100)
        phone_number VARCHAR(20)
        created_at TIMESTAMP
    }
    CONVERSATIONS {
        id SERIAL PK
        name VARCHAR(255)
        is_group BOOLEAN
        created_at TIMESTAMP
    }
    CONVERSATION_USERS {
        id SERIAL PK
        conversation_id INT FK
        user_id INT FK
        joined_at TIMESTAMP
    }
    MESSAGES {
        id SERIAL PK
        conversation_id INT FK
        sender_id INT FK
        content TEXT
        sent_at TIMESTAMP
    }
    USERS ||--o{ CONVERSATION_USERS : participates
    CONVERSATIONS ||--o{ CONVERSATION_USERS : has_users
    CONVERSATIONS ||--o{ MESSAGES : has_messages
    USERS ||--o{ MESSAGES : sends
