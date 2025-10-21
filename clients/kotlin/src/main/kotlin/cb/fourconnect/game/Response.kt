package cb.fourconnect.game

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class Response(
    @SerialName("column") val column: Int,
    @SerialName("state") val state: String = "play"
)