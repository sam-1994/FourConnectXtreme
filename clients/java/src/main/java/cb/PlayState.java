package cb;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayState {
    @JsonProperty("bot")
    private String bot;

    @JsonProperty("coin_id")
    private int coinId;

    @JsonProperty("round")
    private int round;

    @JsonProperty("bombs")
    private List<Map<String, Integer>> bombs;

    @JsonProperty("board")
    private List<List<Integer>> board;

    public PlayState() {
    }

    public String getBot() {
        return bot;
    }

    public void setBot(String bot) {
        this.bot = bot;
    }

    public int getCoinId() {
        return coinId;
    }

    public void setCoinId(int coinId) {
        this.coinId = coinId;
    }

    public int getRound() {
        return this.round;
    }

    public void setRound(int round) {
        this.round = round;
    }

    public List<Map<String, Integer>> getBombs() {
        return this.bombs;
    }

    public void setBombs(List<Map<String, Integer>> bombs) {
        this.bombs = bombs;
    }

    public List<List<Integer>> getBoard() {
        return this.board;
    }

    public void setBoard(List<List<Integer>> board) {
        this.board = board;
    }
}
