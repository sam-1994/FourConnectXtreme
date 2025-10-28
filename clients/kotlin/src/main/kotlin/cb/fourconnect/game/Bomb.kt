package cb.fourconnect.game

import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable

@Serializable
data class Bomb(
    @SerialName("row") val row: Int,
    @SerialName("col") val column: Int,
    @SerialName("explode_in_round") val explodeInRound: Int,
)
{
}