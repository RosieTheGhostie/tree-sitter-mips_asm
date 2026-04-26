import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.mipsasm.TreeSitterMipsAsm;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterMipsAsmTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterMipsAsm.language()));
    }
}
