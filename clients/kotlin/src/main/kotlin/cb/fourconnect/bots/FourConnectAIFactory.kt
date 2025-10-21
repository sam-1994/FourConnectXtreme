package cb.fourconnect.bots

object FourConnectAIFactory
{
    fun create(name: String): FourConnectAI
    {
        return when (name)
        {
            "RandomAI" -> RandomBot()
            //Add your custom code to MyAI, or reference a new class here
            else        -> MyAI()
        }
    }

}