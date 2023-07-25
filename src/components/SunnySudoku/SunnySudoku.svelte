<script lang="ts">
  import { AppPlatforms } from "types/App";
	import Stores from "components/Stores/Stores.svelte";

  const stores = [
    {
      store: AppPlatforms.Apple,
      href: "https://apps.apple.com/us/app/sunny-sudoku/id6450133977"
    },
    {
      store: AppPlatforms.Google,
      href: "https://play.google.com/store/apps/details?id=com.doopydoop.sudoku"
    },
  ]
</script>
<section class="sunnySudoku">
  <h1>Sunny Sudoku</h1>
  <img src="/images/sunnySudokuIcon.png" alt="Sunny Sudoku" class="sunnySudokuIcon">
  <p>Welcome to "Sunny Sudoku," a delightful mobile game that provides a relaxing distraction on a sunny summer day. Immerse yourself in a world of tranquil Sudoku challenges and engage your mind while enjoying the warmth of the sun.</p>
  <Stores
    name="Sunny Sudoku"
    slug="sunny-sudoku"
    {stores} />
</section>