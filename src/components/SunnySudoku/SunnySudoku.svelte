<script lang="ts">
  import sunnySudoku from 'data/projects/sunny-sudoku.json';
	import Stores from 'components/Stores/Stores.svelte';
</script>

<section id="sunnySudoku" class="sunnySudoku">
  <h1>Sunny Sudoku</h1>
  <img src="/images/sunnySudoku/sunnySudokuIcon.png" alt="Sunny Sudoku" class="sunnySudokuIcon">
  <p>Welcome to Sunny Sudoku, a delightful mobile game that provides a relaxing distraction on a sunny summer day. Immerse yourself in a world of tranquil Sudoku challenges and engage your mind while enjoying the warmth of the sun.</p>
  <Stores
    name="Sunny Sudoku"
    slug={sunnySudoku.slug}
    stores={sunnySudoku.stores} />
</section>