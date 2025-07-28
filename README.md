# Easy Playlist

Easy Playlist is a simple web application designed to help users generate custom `yt-dlp` commands for individual videos within a YouTube playlist. It fetches playlist video information using public Piped instances and provides a command for each video, making it convenient to download specific content from a playlist.

## Features

* **Generate `yt-dlp` commands:** Automatically creates `yt-dlp` commands for each video in a given YouTube playlist.
* **Customizable Downloader Prefix:** Allows you to specify a custom prefix (e.g., `python a.py`, `yt-dlp`, `your_script.sh`) that will be prepended to the generated `yt-dlp` commands.
* **Playlist Video Listing:** Displays video titles and thumbnails from the playlist.
* **Copy Command to Clipboard:** Easily copy the generated `yt-dlp` command for any video with a single click.
* **Uses Piped Instances:** Leverages a list of Piped instances to fetch playlist data, enhancing privacy and potentially bypassing YouTube rate limits.
* **Responsive Design:** Adapts its layout for both portrait and landscape orientations.

## How to Use

1.  **Open the Application:** Access the `index.html` file in your web browser.
2.  **Enter Downloader Prefix:** In the first input field, enter the command or script you use to invoke `yt-dlp`. By default, it's `python a.py`.
    * Example: If you have `yt-dlp` installed globally, you might just use `yt-dlp`.
    * Example: If you have a Python script `download_video.py` that runs `yt-dlp`, you might use `python download_video.py`.
3.  **Enter Playlist Link:** In the second input field, paste the full URL of the YouTube playlist you want to process.
4.  **Submit:** Click the "Submit" button.
5.  **View Commands:** The application will fetch the playlist data and display a list of videos with their titles, thumbnails, and the generated `yt-dlp` command below each video.
6.  **Copy Command:** Click on any of the generated `yt-dlp` commands (the text within the `<samp>` tag) to copy it to your clipboard.

