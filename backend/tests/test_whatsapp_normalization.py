import unittest

from app.services.channels.whatsapp_evolution import normalize_message


class NormalizeMessageTests(unittest.TestCase):
    def test_normalizes_incoming_text_message(self) -> None:
        result = normalize_message(
            {
                "data": {
                    "key": {
                        "fromMe": False,
                        "remoteJid": "5511999999999@s.whatsapp.net",
                        "id": "message-1",
                    },
                    "pushName": "Ana Silva",
                    "message": {"conversation": "Olá"},
                }
            }
        )

        self.assertEqual(
            result,
            {
                "phone": "5511999999999",
                "name": "Ana Silva",
                "content": "Olá",
                "external_id": "message-1",
            },
        )

    def test_ignores_messages_sent_by_the_instance(self) -> None:
        result = normalize_message(
            {
                "data": {
                    "key": {"fromMe": True, "remoteJid": "5511999999999@s.whatsapp.net"},
                    "message": {"conversation": "Resposta enviada"},
                }
            }
        )

        self.assertIsNone(result)

    def test_ignores_group_messages(self) -> None:
        result = normalize_message(
            {
                "data": {
                    "key": {"fromMe": False, "remoteJid": "group@g.us"},
                    "message": {"conversation": "Mensagem do grupo"},
                }
            }
        )

        self.assertIsNone(result)

    def test_reads_extended_text_messages(self) -> None:
        result = normalize_message(
            {
                "data": {
                    "key": {"fromMe": False, "remoteJid": "5511888888888@s.whatsapp.net"},
                    "message": {"extendedTextMessage": {"text": "  Quero saber mais  "}},
                }
            }
        )

        self.assertIsNotNone(result)
        self.assertEqual(result["content"], "Quero saber mais")
